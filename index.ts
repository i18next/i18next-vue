import { shallowRef, defineComponent, nextTick, inject, type App, type VNode } from "vue";
import { i18n, type TFunction, type Namespace, type KeyPrefix } from "i18next";

declare module "vue" {
	interface ComponentCustomProperties {
		$t: TFunction<Namespace>;
		$i18next: i18n;
	}
}

interface VueI18NextOptions {
	i18next: i18n;
	rerenderOn?: ("languageChanged" | "loaded" | "added" | "removed")[];
	// Optional custom pattern for matching slot start of the `TranslationComponent`.
	slotStart?: string;
	// Optional custom pattern for matching slot end of the `TranslationComponent`.
	slotEnd?: string;
}

const INJECTION_KEY = Symbol();
export default function install(
	app: App,
	{
		i18next,
		rerenderOn = ["languageChanged", "loaded", "added", "removed"],
		slotStart = "{",
		slotEnd = "}",
	}: VueI18NextOptions,
): void {
	// the ref (internally) tracks which Vue instances use translations
	// Vue will automatically trigger re-renders when the value of 'lastI18nChange' changes
	const lastI18nChange = shallowRef(new Date());
	const invalidate = () =>
		nextTick(() => {
			// defer, so namespace loading is actually complete before re-rendering
			lastI18nChange.value = new Date();
		});
	const usingI18n: () => void = () => lastI18nChange.value;
	rerenderOn.forEach((event) => {
		switch (event) {
			case "added":
			case "removed":
				i18next.store?.on(event, invalidate);
				break;
			default:
				i18next.on(event, invalidate);
				break;
		}
	});

	app.component("i18next", TranslationComponent);

	const i18nextReady = () => i18next.isInitialized;
	app.config.globalProperties.$t = withAccessRecording(
		i18next.t.bind(i18next),
		usingI18n,
		i18nextReady,
	);

	// this proxy makes things like $i18next.language (basically) reactive
	const proxiedI18next = new Proxy(i18next, {
		get(target, prop) {
			usingI18n();
			return Reflect.get(target, prop);
		},
	});
	app.config.globalProperties.$i18next = proxiedI18next;

	app.provide<I18nPluginContext>(INJECTION_KEY, {
		i18next: proxiedI18next,
		slotPattern: slotNamePattern(slotStart, slotEnd),
		withAccessRecording(t, translationsReady) {
			return withAccessRecording(t, usingI18n, translationsReady);
		},
	});
}

interface I18nPluginContext {
	withAccessRecording: <T extends Function>(t: T, translationsReady: () => boolean) => T;
	slotPattern: RegExp;
	i18next: i18n;
}
interface UseTranslationOptions<TKPrefix = undefined> {
	keyPrefix?: TKPrefix;
	lng?: string | readonly string[];
}

export function useTranslation<N extends Namespace, TKPrefix extends KeyPrefix<N> = undefined>(
	ns?: N,
	options?: UseTranslationOptions<TKPrefix>,
) {
	const { i18next, withAccessRecording } = getContext();
	let t: TFunction<N, TKPrefix>;

	if (options?.lng) {
		t = i18next.getFixedT(options.lng, ns, options?.keyPrefix);
	} else {
		t = i18next.getFixedT(null, ns ?? null, options?.keyPrefix);
	}
	return {
		i18next,
		t: withAccessRecording(t, ensureTranslationsLoaded(i18next, ns)),
	};
}

// produces a function, which will return true if the given translations are available already, else starts loading them and returns false
function ensureTranslationsLoaded(
	i18next: i18n,
	ns: string | readonly string[] = [],
): () => boolean {
	let loaded: boolean | undefined;
	return () => {
		if (loaded === undefined) {
			if (!i18next.isInitialized) {
				return false;
			} else {
				const toCheck = typeof ns === "string" ? [ns] : ns;
				const missing = toCheck.filter((n) => !i18next.hasLoadedNamespace(n));
				if (!missing.length) {
					loaded = true;
				} else {
					loaded = false;
					i18next.loadNamespaces(missing).then(() => (loaded = true));
				}
			}
		}
		return loaded;
	};
}

function withAccessRecording<T extends Function>(
	t: T,
	usingI18n: () => void,
	translationsReady: () => boolean,
): T {
	return new Proxy(t, {
		apply: function (target, thisArgument, argumentsList) {
			usingI18n(); // called during render, so we will get re-rendered when translations change
			if (!translationsReady()) {
				return "";
			}
			return Reflect.apply(target, thisArgument, argumentsList);
		},
	}) as T;
}

function getContext() {
	const i18nextContext = inject<I18nPluginContext>(INJECTION_KEY);
	if (!i18nextContext) {
		throw new Error(
			"i18next-vue: Make sure to register the i18next-vue plugin using app.use(...).",
		);
	}
	return i18nextContext;
}

// pattern matches '{ someSlot }'
function slotNamePattern(start: string, end: string) {
	const pattern = `${start}\\s*([a-z0-9\\-]+)\\s*${end}`;
	return new RegExp(pattern, "gi");
}

export const TranslationComponent = defineComponent({
	props: {
		translation: {
			type: String,
			required: true,
		},
	},
	setup(props, { slots }) {
		const { slotPattern } = getContext();
		return () => {
			const translation = props.translation;
			const result: (string | VNode)[] = [];

			let match;
			let lastIndex = 0;
			while ((match = slotPattern.exec(translation)) !== null) {
				result.push(translation.substring(lastIndex, match.index));
				const slot = slots[match[1]];
				if (slot) {
					result.push(...slot());
				} else {
					result.push(match[0]);
				}
				lastIndex = slotPattern.lastIndex;
			}
			result.push(translation.substring(lastIndex));
			return result;
		};
	},
});
