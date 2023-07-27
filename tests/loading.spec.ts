import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import globalI18next from "i18next";
import i18nextvue, { useTranslation } from "../index";
import { LoadingModule, TranslateWithKey, withTimeout, expectText } from "./helpers";

test("Simple translate", async () => {
	const i18next = globalI18next.createInstance();
	const backend = new LoadingModule();
	i18next.use(backend).init({
		lng: "en",
		fallbackLng: false,
	});

	const wrapper = mount(TranslateWithKey, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});
	expect(wrapper.text()).toBe("");

	await withTimeout(() => {
		backend.fakeLoaded("en", "translation", { hello: "Hello world" });
	});

	await expectText(wrapper, "Hello world");
});

test("Language change", async () => {
	const i18next = globalI18next.createInstance();
	const backend = new LoadingModule();
	const initPromise = i18next.use(backend).init({
		lng: "en",
		fallbackLng: false,
	});
	await withTimeout(() => {
		backend.fakeLoaded("en", "translation", { hello: "Hello world" });
	});
	await initPromise;

	const wrapper = mount(TranslateWithKey, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});

	expect(wrapper.text()).toBe("Hello world");

	i18next.changeLanguage("de");

	// remains en, as de is not yet loaded
	await expectText(wrapper, "Hello world");

	await withTimeout(() => {
		backend.fakeLoaded("de", "translation", { hello: "Hallo Welt" });
	});

	// now it actually is de
	await expectText(wrapper, "Hallo Welt");

	await i18next.changeLanguage("en");
	await expectText(wrapper, "Hello world");
});

test("Composition-t, loading namespace", async () => {
	const CompositionWithNsp = {
		template: "<p>t: {{ t(k) }} - $t: {{ $t(k) }} </p>",
		props: ["k"],
		setup() {
			return useTranslation("nsp2");
		},
	};

	const i18next = globalI18next.createInstance();
	const backend = new LoadingModule();
	const initPromise = i18next.use(backend).init({
		lng: "en",
		fallbackLng: false,
	});

	const wrapper = mount(CompositionWithNsp, {
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next }]],
		},
	});
	expect(wrapper.text()).toBe("t:  - $t:");

	await withTimeout(() => {
		backend.fakeLoaded("en", "translation", { hello: "Hello world" });
	});
	await initPromise;
	await expectText(wrapper, "t:  - $t: Hello world");

	await withTimeout(() => {
		backend.fakeLoaded("en", "nsp2", { hello: "Greetings globe!" });
	});
	await expectText(wrapper, "t: Greetings globe! - $t: Hello world");
});
