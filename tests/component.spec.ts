import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import globalI18next from 'i18next'
import i18nextvue from "../index"
import { expectHTML, expectText, TranslateWithKey } from './helpers'

test('Translation component', async () => {
    const Component = {
        template:
            '<i18next :translation="$t(\'term\')">' +
            '<template #termsOfUseLink><a href="#" target="_blank">{{ $t("tos") }}</a></template>' +
            '<template #strongPromise><strong>{{ $t("promise") }}</strong></template>' +
            '</i18next>'
    }

    const i18next = globalI18next.createInstance()
    await i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    tos: "Terms of Service",
                    term: "I accept the {termsOfUseLink}. {strongPromise}.",
                    promise: "I promise",
                    "component-greeting_one": "{greeting} single person {{whatTheyDo}}",
                    "component-greeting_other":
                        "{greeting} {{count}} people {{whatTheyDo}}",
                    hello: "Greetings",
                }
            },
            de: {
                translation: {
                    tos: "Nutzungsbedingungen",
                    term: "{strongPromise}! Ich stimme den {termsOfUseLink} zu.",
                    promise: "Ich versprech's",
                    "component-greeting_one": "{greeting} Einzelperson {{whatTheyDo}}",
                    "component-greeting_other": "{greeting} {{count}} Leute {{whatTheyDo}}",
                    hello: "Grüße",
                }
            },
        },
    });

    const wrapper = mount(Component, {
        global: {
            plugins: [[i18nextvue, { i18next }]]
        }
    })

    await expectHTML(wrapper, 'I accept the\n<a href="#" target="_blank">Terms of Service</a>\n.\n<strong>I promise</strong>\n.')

    await i18next.changeLanguage('de');
    await expectHTML(wrapper, `\n<strong>Ich versprech's</strong>\n! Ich stimme den\n<a href="#" target="_blank">Nutzungsbedingungen</a>\n zu.`)
})

test('Missing slots remain as text', async () => {
    const Component = {
        template:
            '<i18next :translation="$t(\'term\')"></i18next>'
    }

    const i18next = globalI18next.createInstance()
    await i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    term: "I accept the {termsOfUseLink}.",
                }
            },
        },
    });

    const wrapper = mount(Component, {
        global: {
            plugins: [[i18nextvue, { i18next }]]
        }
    })

    await expectHTML(wrapper, 'I accept the\n{termsOfUseLink}\n.')
})