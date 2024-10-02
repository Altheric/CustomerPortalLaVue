import { createOverviewRoute } from 'services/router/factory';
import OverviewPage from './pages/Overview.vue';
import { setTranslation } from 'services/translation';

export const SUPPORT_DOMAIN_NAME = 'support';

setTranslation(SUPPORT_DOMAIN_NAME, {
    singular: 'hulp',
    plural: 'hulp',
});



export const supportRoutes = [createOverviewRoute(SUPPORT_DOMAIN_NAME, OverviewPage)];