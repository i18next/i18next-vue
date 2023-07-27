import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import globalI18next from "i18next";
import i18nextvue, { useTranslation } from "../index";
import { TranslateWithKey } from "./helpers";

test.each([
	[undefined, "Hello world"],
	[false, "Hello world"],
	[true, "Hallo Welt"],
])("i18nOptions: lng with %s", async (enableLegacy: boolean | undefined, expected: string) => {
	const Component = {
		...TranslateWithKey,
		i18nOptions: {
			lng: "de",
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
		props: {
			k: "hello",
		},
		global: {
			plugins: [[i18nextvue, { i18next, legacyI18nOptionsSupport: enableLegacy }]],
		},
	});

	expect(wrapper.text()).toBe(expected);
});

test.each([
	[undefined, "Hello world"],
	[false, "Hello world"],
	[true, "Hello world"],
])(
	"i18nOptions not supported with useTranslation",
	async (enableLegacy: boolean | undefined, expected: string) => {
		const Component = {
			template: "<p>{{ t(k) }}</p>",
			props: ["k"],
			setup() {
				return useTranslation();
			},
			i18nOptions: {
				lng: "de",
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
			props: {
				k: "hello",
			},
			global: {
				plugins: [[i18nextvue, { i18next, legacyI18nOptionsSupport: enableLegacy }]],
			},
		});

		expect(wrapper.text()).toBe(expected);
	},
);

test.each([
	[["nsp2"], undefined, "Hello world"],
	[["nsp2"], false, "Hello world"],
	[["nsp2"], true, "Greetings globe!"],
	["nsp2", undefined, "Hello world"],
	["nsp2", false, "Hello world"],
	["nsp2", true, "Greetings globe!"],
	[["translation"], undefined, "Hello world"],
	[["translation"], false, "Hello world"],
	[["translation"], true, "Hello world"],
])(
	"i18nOptions: namespaces %s (%s)",
	async (namespaces: string[] | string, enableLegacy: boolean | undefined, expected: string) => {
		const Component = {
			...TranslateWithKey,
			i18nOptions: {
				namespaces: namespaces,
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

		const wrapper = mount(Component, {
			props: {
				k: "hello",
			},
			global: {
				plugins: [[i18nextvue, { i18next, legacyI18nOptionsSupport: enableLegacy }]],
			},
		});

		expect(wrapper.text()).toBe(expected);
	},
);

test("legacy but no i18nOptions", async () => {
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
			plugins: [[i18nextvue, { i18next, legacyI18nOptionsSupport: true }]],
		},
	});

	expect(wrapper.text()).toBe("Hello world");
});
