import { flushPromises, VueWrapper } from "@vue/test-utils";
import { expect } from "vitest";
import type { BackendModule, ReadCallback, ResourceKey } from "i18next";

export const TranslateWithKey = {
	template: "<p>{{ $t(k) }}</p>",
	props: ["k"],
};

export async function expectText(wrapper: VueWrapper, expected: string) {
	await flushPromises(); // await potential Vue re-rendering
	expect(wrapper.text()).toBe(expected);
}

export async function expectHTML(wrapper: VueWrapper, expected: string) {
	await flushPromises(); // await potential Vue re-rendering
	expect(wrapper.html()).toBe(expected);
}

export function withTimeout(code: () => void) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			code();
			resolve();
		}, 1);
	});
}

export class LoadingModule implements BackendModule<void> {
	type = "backend" as const;
	#callbacks = {} as Record<string, Record<string, ReadCallback>>;
	constructor() {}

	init() {
		// ok, cool
	}
	read(language: string, namespace: string, callback: ReadCallback) {
		// console.log("read", { language, namespace })
		const lngCallbacks = (this.#callbacks[language] ??= {});
		lngCallbacks[namespace] = callback;
	}
	fakeLoaded(language: string, namespace: string, resources: ResourceKey) {
		// console.log("fake", { language, namespace })
		const lngCallbacks = this.#callbacks[language];
		lngCallbacks[namespace](null, resources);
		delete lngCallbacks[namespace];
	}
}
