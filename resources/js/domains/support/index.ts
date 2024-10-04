import { createOverviewRoute } from 'services/router/factory';
import OverviewPage from './pages/Overview.vue';
import { setTranslation } from 'services/translation';
import { storeModuleFactory } from 'services/store';

export const SUPPORT_DOMAIN_NAME = 'support';

setTranslation(SUPPORT_DOMAIN_NAME, {
    singular: 'overzicht',
    plural: 'overzicht',
});

export const supportRoutes = [createOverviewRoute(SUPPORT_DOMAIN_NAME, OverviewPage)];

const baseSupportStore = storeModuleFactory(SUPPORT_DOMAIN_NAME)

export const supportStore = {
    getters: baseSupportStore.getters,
    setters: baseSupportStore.setters,
    actions: baseSupportStore.actions,
}