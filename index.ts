import _Vue, { FunctionalComponentOptions, VNode, getCurrentInstance } from "vue";
import type { RecordPropsDefinition } from "vue/types/options";
import { i18n, TFunction, Namespace, KeyPrefix } from "i18next";

declare module "vue/types/vue" {
    interface Vue {
        $t: TFunction;
        $i18next: i18n;
    }
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $t: TFunction;
        $i18next: i18n;
    }
}
declare module "vue/types/options" {
    interface ComponentOptions<V extends _Vue, Data, Methods, Computed, PropsDef, Props> {
        i18nOptions?: {
            lng?: string;
            keyPrefix?: string;
            namespaces?: string | string[];
        }
    }
}

interface VueI18NextOptions {
    i18next: i18n;
    rerenderOn?: ('languageChanged' | 'loaded' | 'added' | 'removed')[];
    // Optional custom pattern for matching slot start of the `TranslationComponent`.
    slotStart?: string,
    // Optional custom pattern for matching slot end of the `TranslationComponent`.
    slotEnd?: string,
    // enable support for the `i18nOptions` option. Will be removed in v4.
    legacyI18nOptionsSupport?: boolean
}

export default function install(Vue: typeof _Vue, {
    i18next,
    rerenderOn = ['languageChanged', 'loaded', 'added', 'removed'],
    slotStart = '{',
    slotEnd = '}',
    legacyI18nOptionsSupport = false,
}: VueI18NextOptions): void {
    // the observable (internally) tracks which Vue instances use translations and will automatically 
    // trigger re-renders by Vue when the value of 'lastI18nChange' changes
    const lastI18nChange = Vue.observable({ value: new Date() });
    const invalidate: () => void = () => Vue.nextTick(() => lastI18nChange.value = new Date());
    const usingI18n: () => void = () => lastI18nChange.value;
    rerenderOn.forEach(event => {
        switch (event) {
            case 'added':
            case 'removed':
                i18next.store?.on(event, invalidate);
                break;
            default:
                i18next.on(event, invalidate)
                break;
        }
    })

    Vue.component('i18next', TranslationComponent);

    const i18nextReady = () => i18next.isInitialized;
    if (!legacyI18nOptionsSupport) {
        Vue.prototype.$t = withAccessRecording(i18next.t.bind(i18next), usingI18n, i18nextReady);
    } else {
        Vue.prototype.$t = withAccessRecording(legacyT, usingI18n, i18nextReady) as TFunction;
    }

    // this proxy makes things like $i18next.language (basically) reactive
    // we also use it to share some internal state with otherwise unrelated code, like the TranslationComponent
    Vue.prototype.$i18next = new Proxy(i18next, {
        get(target, prop) {
            switch (prop) {
                case "__withAccessRecording": {
                    return (f: Function, translationsReady: () => boolean) => withAccessRecording(f, usingI18n, translationsReady);
                }
                case "__slotPattern": {
                    return slotNamePattern(slotStart, slotEnd);
                }
                default: {
                    usingI18n();
                    return Reflect.get(target, prop);
                }
            }
        }
    });

    function legacyT(this: Vue, keys: string | string[], options?: Record<string, any>) {
        const i18nOptions = this.$options.i18nOptions
        if (!i18nOptions) {
            return i18next.t(keys, options);
        }
        if (i18nOptions.namespaces && !ensureTranslationsLoaded(i18next, i18nOptions.namespaces)()) {
            return ''; // will re-render once translations are available
        }

        let keyPrefix = i18nOptions.keyPrefix;
        if (typeof keys === 'string' && includesNs(keys, i18next)) {
            keyPrefix = undefined;
        }
        let t: TFunction;
        if (i18nOptions.lng) {
            t = i18next.getFixedT(i18nOptions.lng, i18nOptions.namespaces, keyPrefix);
        } else {
            t = i18next.getFixedT(null, i18nOptions.namespaces ?? null, keyPrefix);
        }
        return t(keys, options);
    }
    function includesNs(key: string, i18next: i18n): boolean {
        const nsSeparator = i18next.options.nsSeparator;
        return typeof nsSeparator === "string" && key.includes(nsSeparator);
    }
}

interface Extendedi18n extends i18n {
    __withAccessRecording: <T extends Function> (t: T, translationsReady: () => boolean) => T;
    __slotPattern: RegExp;
}
interface UseTranslationOptions<TKPrefix = undefined> {
    keyPrefix?: TKPrefix;
    lng?: string | readonly string[]
}

export function useTranslation<N extends Namespace, TKPrefix extends KeyPrefix<N> = undefined>
    (ns?: N, options?: UseTranslationOptions<TKPrefix>) {
    const i18next = getGlobalI18Next();
    let t: TFunction<N, TKPrefix>;

    if (options?.lng) {
        t = i18next.getFixedT(options.lng, ns, options?.keyPrefix);
    } else {
        t = i18next.getFixedT(null, ns ?? null, options?.keyPrefix);
    }
    return {
        i18next: i18next as i18n,
        t: i18next.__withAccessRecording(t, ensureTranslationsLoaded(i18next, ns))
    };
}

// produces a function, which will return true if the given translations are available already, else starts loading them and returns false
function ensureTranslationsLoaded(i18next: i18n, ns: string | readonly string[] = []): () => boolean {
    let loaded: boolean | undefined;
    return () => {
        if (loaded === undefined) {
            if (!i18next.isInitialized) {
                return false;
            } else {
                const toCheck = typeof ns === 'string' ? [ns] : ns;
                const missing = toCheck.filter(n => !i18next.hasLoadedNamespace(n));
                if (!missing.length) {
                    loaded = true;
                } else {
                    loaded = false;
                    i18next.loadNamespaces(missing).then(() => loaded = true);
                }
            }
        }
        return loaded;
    };
}

function withAccessRecording<T extends Function>(t: T, usingI18n: () => void, translationsReady: () => boolean): T {
    return new Proxy(t, {
        apply: function (target, thisArgument, argumentsList) {
            usingI18n(); // called during render, so we will get re-rendered when translations change
            if (!translationsReady()) {
                return '';
            }
            return Reflect.apply(target, thisArgument, argumentsList)
        }
    }) as T;
}

function getGlobalI18Next() {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error("i18next-vue: No Vue instance in context. This needs to be called inside setup().");
    }
    const globalProps = _Vue.prototype;
    if (!globalProps.$i18next) {
        throw new Error("i18next-vue: Make sure to register the i18next-vue plugin using Vue.use(...).");
    }
    return globalProps.$i18next as Extendedi18n;
}

// pattern matches '{ someSlot }'
function slotNamePattern(start: string, end: string) {
    const pattern = `${start}\\s*([a-z0-9\\-]+)\\s*${end}`;
    return new RegExp(pattern, 'gi');
}
const TranslationComponent:
    FunctionalComponentOptions<
        { translation: string },
        RecordPropsDefinition<{ translation: string; }>
    > = {
    functional: true,
    props: {
        translation: {
            type: String,
            required: true,
        }
    },
    render(_createElement, context) {
        const slotPattern = getGlobalI18Next().__slotPattern;
        const textNode: (t: string) => VNode = (context as any)._v; // createTextVNode internal API
        const translation = context.props.translation;
        const result: VNode[] = [];

        let match;
        let lastIndex = 0;
        while ((match = slotPattern.exec(translation)) !== null) {
            result.push(textNode(translation.substring(lastIndex, match.index)))
            const slot = context.scopedSlots[match[1]];
            if (slot) {
                const nodes = slot({})
                nodes?.forEach(n => result.push(n))
            } else {
                result.push(textNode(match[0]));
            }
            lastIndex = slotPattern.lastIndex;
        }
        result.push(textNode(translation.substring(lastIndex)))
        return result;
    }
};