/* eslint-disable prettier/prettier */
import type { App } from 'vue';

import {
    DEFAULT_QUERY_ENDPOINT,
    type RequestHandlerContext,
    SvelteQueryContextKey,
} from './_helper';

export type ZenStackQueryPluginOptions = RequestHandlerContext;

export const ZenStackQueryPlugin = {
    install: (
        app: App<Element>,
        options: ZenStackQueryPluginOptions = {
            endpoint: DEFAULT_QUERY_ENDPOINT,
        }
    ) => {
        app.provide(SvelteQueryContextKey, options);
    },
};
