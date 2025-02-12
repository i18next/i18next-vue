import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import globalI18next from "i18next";
import i18nextvue, { useTranslation } from "../index";
import { expectText } from "./helpers";

const CompositionWithKey = {
	template: "<p>{{ t(k) }}</p>",
	props: ["k"],
	setup() {
		return useTranslation();
	},
};

test("Simple translate", async () => {
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: { translation: { hello: "Hello world" } },
		},
	});

	const wrapper = mount(CompositionWithKey, {
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

	const wrapper = mount(CompositionWithKey, {
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

test("$i18next reactivity", async () => {
	const LangComponent = {
		template: "<p>{{ i18next.language }}</p>",
		setup() {
			return useTranslation();
		},
	};
	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {},
	});

	const wrapper = mount(LangComponent, {
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("en");

	await i18next.changeLanguage("de");
	await expectText(wrapper, "de");

	await i18next.changeLanguage("en");
	await expectText(wrapper, "en");
});

test("Composition-t with set namespace", async () => {
	const CompositionWithNsp = {
		template: "<p>local: {{ t(k) }}  - global: {{ $t(k) }} </p>",
		props: ["k"],
		setup() {
			return useTranslation("nsp2");
		},
	};

	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: {
				translation: { hello: "Hello world" },
				nsp2: { hello: "Greetings globe!" },
			},
		},
	});

	const wrapper = mount(CompositionWithNsp, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("local: Greetings globe! - global: Hello world");
});

test("Composition-t with set language", async () => {
	const Component = {
		template: "<p>local: {{ t('hello') }}  - global: {{ $t('hello') }} </p>",
		setup() {
			return useTranslation(undefined, { lng: "de" });
		},
	};

	const i18next = globalI18next.createInstance();
	await i18next.init({
		lng: "en",
		resources: {
			en: { translation: { hello: "Hello world" } },
			de: { translation: { hello: "Hallo Welt" } },
		},
	});

	const wrapper = mount(Component, {
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("local: Hallo Welt - global: Hello world");
});
