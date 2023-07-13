import { ref, getCurrentInstance, App, defineComponent, VNode } from "vue";
import { i18n, TFunction, Namespace, KeyPrefix } from "i18next";

type Messages = { [index: string]: string | Messages };
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: TFunction;
        $i18next: i18n;
    }
}

interface VueI18NextOptions {
    i18next: i18n;
    rerenderOn?: ('languageChanged' | 'loaded' | 'added' | 'removed')[];
    // Optional custom pattern for matching slot start of the `TranslationComponent`.
    slotStart?: string,
    // Optional custom pattern for matching slot end of the `TranslationComponent`.
    slotEnd?: string,
}

export default function install(app: App, {
    i18next,
    rerenderOn = ['languageChanged', 'loaded', 'added', 'removed'],
    slotStart = '{',
    slotEnd = '}',
}: VueI18NextOptions): void {
    // the ref (internally) tracks which Vue instances use translations
    // Vue will automatically trigger re-renders when the value of 'lastI18nChange' changes
    const lastI18nChange = ref(new Date());
    const invalidate: () => void = () => lastI18nChange.value = new Date();
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

    app.component('i18next', TranslationComponent);

    app.config.globalProperties.$t = withAccessRecording(i18next.t.bind(i18next), usingI18n, i18next);

    // this proxy makes things like $i18next.language (basically) reactive
    // we also use it to share some internal state with otherwise unrelated code, like the TranslationComponent
    app.config.globalProperties.$i18next = new Proxy(i18next, {
        get(target, prop) {
            switch (prop) {
                case "__withAccessRecording": {
                    return (f: Function) => withAccessRecording(f, usingI18n, i18next);
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
}

interface Extendedi18n extends i18n {
    __withAccessRecording: <T extends Function> (t: T) => T;
    __slotPattern: RegExp;
}
interface UseTranslationOptions<TKPrefix = undefined> {
    keyPrefix?: TKPrefix;
    lng?: string | readonly string[]
}

export function useTranslation<N extends Namespace, TKPrefix extends KeyPrefix<N> = undefined>
    (ns?: N, options?: UseTranslationOptions<TKPrefix>) {
    const instance = currentInstance();
    const globalProps = instance.appContext.config.globalProperties;
    const i18next = globalProps.$i18next as Extendedi18n;
    let t: TFunction<N, TKPrefix>;

    if (options?.lng) {
        t = i18next.getFixedT(options.lng, ns, options?.keyPrefix);
    } else {
        t = i18next.getFixedT(null, ns ?? null, options?.keyPrefix);
    }
    return {
        i18next: i18next as i18n,
        t: i18next.__withAccessRecording(t)
    };
}

function withAccessRecording<T extends Function>(t: T, usingI18n: () => void, i18next: i18n): T {
    return new Proxy(t, {
        apply: function (target, thisArgument, argumentsList) {
            usingI18n(); // called during render, so we will get re-rendered when translations change
            if (!i18next.isInitialized) {
                return '';
            }
            return Reflect.apply(target, thisArgument, argumentsList)
        }
    }) as T;
}

function currentInstance() {
    const instance = getCurrentInstance();
    if (!instance) {
        throw new Error("i18next-vue: No Vue instance in context. Make sure to register the i18next-vue plugin using app.use(...).");
    }
    return instance;
}

// pattern matches '{ someSlot }'
function slotNamePattern(start: string, end: string) {
    const pattern = `${start}\\s*([a-z0-9\\-]+)\\s*${end}`;
    return new RegExp(pattern, 'gi');
}

export const TranslationComponent = defineComponent({
    props: {
        "translation": {
            type: String,
            required: true
        }
    },
    setup(props, { slots }) {
        const instance = currentInstance()
        const globalProps = instance.appContext.config.globalProperties;
        const slotPattern = (globalProps.$i18next as Extendedi18n).__slotPattern;

        return () => {
            const translation = props.translation;
            const result: (string | VNode)[] = [];

            let match;
            let lastIndex = 0;
            while ((match = slotPattern.exec(translation)) !== null) {
                result.push(translation.substring(lastIndex, match.index))
                const slot = slots[match[1]];
                if (slot) {
                    result.push(...slot());
                } else {
                    result.push(match[0]);
                }
                lastIndex = slotPattern.lastIndex;
            }
            result.push(translation.substring(lastIndex))
            return result;
        };
    }
});
