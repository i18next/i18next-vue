import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import globalI18next from "i18next";
import i18nextvue from "../index";
import { expectText, TranslateWithKey } from "./helpers";

test("Simple translate", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: { translation: { hello: "Hello world" } },
		},
	});

	const wrapper = mount(TranslateWithKey, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("Hello world");
});

test("Language change", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: { translation: { hello: "Hello world" } },
			de: { translation: { hello: "Hallo Welt" } },
		},
	});

	const wrapper = mount(TranslateWithKey, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("Hello world");

	await i18next.changeLanguage("de");
	await expectText(wrapper, "Hallo Welt");

	await i18next.changeLanguage("en");
	await expectText(wrapper, "Hello world");
});
