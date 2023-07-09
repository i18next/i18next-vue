import { ref, getCurrentInstance, App, ComponentPublicInstance, defineComponent, VNode } from "vue";
import { i18n, TFunction, Namespace, KeyPrefix } from "i18next";

type ComponentI18nInstance = ComponentPublicInstance & {
    __bundles?: Array<[string, string]>;  // the bundles loaded by the component
    __translate?: TFunction; // local to each component with an <i18n> block or i18nOptions
};

type Messages = { [index: string]: string | Messages };
declare module '@vue/runtime-core' {
    interface ComponentCustomOptions {
        __i18n?: string[]; // due to package @intlify/vue-i18n-loader, each component with at least one <i18n> block has __i18n set
        i18nOptions?: {
            lng?: string;
            keyPrefix?: string;
            namespaces?: string | string[];
            messages?: Messages;
        }
    }
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
    const genericT = i18next.t.bind(i18next);
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
    app.mixin({
        beforeCreate(this: ComponentI18nInstance) {
            const options = this.$options;
            if (!options.__i18n && !options.i18nOptions) {
                this.__translate = undefined;  // required to enable proxied access to `__translate` in the $t function
                return;
            }

            // each component gets its own 8-digit random namespace prefixed with its name if available
            const name = this.$options.name;
            const rand = ((Math.random() * 10 ** 8) | 0).toString();
            const localNs = [name, rand].filter(x => !!x).join("-");

            // used to store added resource bundle identifiers for later removal upen component destruction
            this.__bundles = [];
            const loadBundle = (bundle: Messages) => {
                Object.entries(bundle).forEach(([lng, resources]) => {
                    i18next.addResourceBundle(lng, localNs, resources, true, false);
                    this.__bundles!.push([lng, localNs]);
                });
            }

            // iterate all <i18n> blocks' contents as provided by @intlify/vue-i18n-loader and make them available to i18next
            options.__i18n?.forEach(bundle => {
                loadBundle(JSON.parse(bundle));
            });

            let { lng, ns, keyPrefix } = handleI18nOptions(options, loadBundle);
            if (this.__bundles?.length) { // has local translations
                ns = [localNs].concat(ns ?? []); // add component-local namespace, thus finding and preferring local translations
            }

            const t = getTranslationFunction(lng, ns);
            this.__translate = ((key: string | string[], options: any) => {
                if (!keyPrefix || typeof key !== 'string' || includesNs(key)) {
                    return t(key, options);
                } else { // adding keyPrefix only if key is not namespaced
                    return t(keyPrefix + '.' + key, options);
                }
            }) as TFunction;
        },
        unmounted(this: ComponentI18nInstance) {
            this.__bundles?.forEach(([lng, ns]) => i18next.removeResourceBundle(lng, ns)); // avoid memory leaks
        }
    });

    app.config.globalProperties.$t = function (this: ComponentI18nInstance | undefined, key: string | string[], options: any) {
        usingI18n(); // called during render, so we will get re-rendered when translations change
        if (i18next.isInitialized) {
            return (this?.__translate ?? genericT)(key, options);
        } else {
            return key;
        }
    } as TFunction;

    // this proxy makes things like $i18next.language (basically) reactive
    // we also use it to share some internal state with otherwise unrelated code, like the TranslationComponent
    app.config.globalProperties.$i18next = new Proxy(i18next, {
        get(target, prop) {
            switch (prop) {
                case "__usingI18n": {
                    return usingI18n;
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


    /** Translation function respecting lng and ns. The namespace can be overriden in $t calls using a key prefix or the 'ns' option. */
    function getTranslationFunction(lng?: string, ns?: string | readonly string[]): TFunction {
        if (lng) {
            return i18next.getFixedT(lng, ns);
        } else if (ns) {
            return i18next.getFixedT(null, ns);
        } else {
            return genericT;
        }
    }

    function includesNs(key: string): boolean {
        const nsSeparator = i18next.options.nsSeparator;
        return typeof nsSeparator === "string" && key.includes(nsSeparator);
    }

    function handleI18nOptions(options: any, loadBundle: (bundle: Messages) => void) {
        let lng: string | undefined;
        let ns: string | readonly string[] | undefined;
        let keyPrefix: string | undefined;
        if (options.i18nOptions) {
            let messages: Messages | undefined;
            let namespaces: string | readonly string[] | false | undefined;
            ({
                lng,
                namespaces = i18next.options.defaultNS,
                keyPrefix,
                messages,
            } = options.i18nOptions);

            // make i18nOptions.messages available to i18next
            if (messages) {
                loadBundle(messages);
            }

            ns = namespaces || undefined;
            if (ns) {
                i18next.loadNamespaces(ns); // load configured namespaces
            }
        }
        return { lng, ns, keyPrefix };
    }
}


interface Extendedi18n extends i18n {
    __usingI18n: () => void;
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
    let t: TFunction<N, TKPrefix>

    if (options?.lng) {
        t = withAccessRecording(i18next.getFixedT(options.lng, ns, options?.keyPrefix), i18next.__usingI18n);
    } else if (ns) {
        t = withAccessRecording(i18next.getFixedT(null, ns, options?.keyPrefix), i18next.__usingI18n);
    } else {
        t = globalProps.$t.bind(instance.proxy);
    }
    return {
        i18next: i18next as i18n,
        t
    };
}

function withAccessRecording<T extends Function>(t: T, usingI18n: () => void): T {
    return new Proxy(t, {
        apply: function (target, thisArgument, argumentsList) {
            console.log("recording access")
            usingI18n();
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
