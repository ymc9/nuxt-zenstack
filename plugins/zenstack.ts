/* eslint-disable prettier/prettier */
import { VueQueryPlugin } from '@tanstack/vue-query';

import { ZenStackQueryPlugin } from '../lib/hooks/plugin';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueQueryPlugin);
    nuxtApp.vueApp.use(ZenStackQueryPlugin);
});
