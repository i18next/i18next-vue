import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import globalI18next from 'i18next'
import i18nextvue from "../index"
import { expectText, LoadingModule, withTimeout } from './helpers'


test('$i18next.isInitialized reactive', async () => {
    const Component = {
        template: '<p v-if="$i18next.isInitialized">Initialized</p><p v-else>Loading</p>',
    }

    const i18next = globalI18next.createInstance()
    const backend = new LoadingModule();
    i18next.use(backend).init({
        lng: 'en',
        fallbackLng: false
    });

    const wrapper = mount(Component, {
        global: {
            plugins: [[i18nextvue, { i18next }]]
        }
    })
    expect(!!i18next.isInitialized).toBe(false)
    await expectText(wrapper, 'Loading')

    await withTimeout(() => {
        backend.fakeLoaded('en', 'translation', {});
    })

    expect(i18next.isInitialized).toBe(true)
    await expectText(wrapper, 'Initialized')
})
