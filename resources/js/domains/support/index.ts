import { createOverviewRoute } from 'services/router/factory';
import OverviewPage from './pages/Overview.vue';
import PrivateViewPage from './pages/PrivateView.vue';
import { setTranslation } from 'services/translation';
import { storeModuleFactory } from 'services/store';
import { computed } from 'vue';
import type { Ticket } from './types';

export const SUPPORT_DOMAIN_NAME = 'support';

setTranslation(SUPPORT_DOMAIN_NAME, {
    singular: 'overzicht',
    plural: 'overzicht',
});

export const supportRoutes = [
    createOverviewRoute(SUPPORT_DOMAIN_NAME, OverviewPage),
{
    path: '/overzicht/mijn-tickets/:id',
    name: 'Mijn Tickets',
    component: OverviewPage,
    meta: {auth: true, canSeeWhenLoggedIn: true},
}];

const baseSupportStore = storeModuleFactory<Ticket>(SUPPORT_DOMAIN_NAME)

export const supportStore = {
    setters: baseSupportStore.setters,
    actions:baseSupportStore.actions,
    getters: {
        ...baseSupportStore.getters,
        /** Get all tickets with the relevant category_id from the store.*/
        getTicketsByCategory: (id: number) => computed<Ticket[]>(() => Object.values(baseSupportStore.state.value).filter((ticket) => ticket.category_id == id)),
        /** Get all tickets of the logged in user from the store.*/
        getMyTickets: (id: number) => computed(() => Object.values(baseSupportStore.state.value).filter((ticket) => ticket.user?.id == id)),
    }
}