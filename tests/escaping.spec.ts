import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import globalI18next from "i18next";
import i18nextvue from "../index";

export const TranslateWithKeyAndValue = {
	template: "<p>{{ $t(k, {val: v}) }}</p>",
	props: ["k", "v"],
};

test("Vue text escaping without value", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { translation: { hello: "Hello <world>" } },
		},
	});

	const wrapper = mount(TranslateWithKeyAndValue, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.html()).toBe("<p>Hello &lt;world&gt;</p>");
});

test("Default config will yield double value escaping", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: { translation: { hello: "Hello {{val}}" } },
		},
	});

	const wrapper = mount(TranslateWithKeyAndValue, {
		props: {
			k: "hello",
			v: "<world>",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.html()).toBe("<p>Hello &amp;lt;world&amp;gt;</p>");
});

test("Recommended config with proper escaping", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { translation: { hello: "Hello {{val}}" } },
		},
	});

	const wrapper = mount(TranslateWithKeyAndValue, {
		props: {
			k: "hello",
			v: "<world>",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.html()).toBe("<p>Hello &lt;world&gt;</p>");
});
