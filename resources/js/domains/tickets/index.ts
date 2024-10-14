import { createOverviewRoute, createCreateRoute } from 'services/router/factory';
import OverviewPage from './pages/Overview.vue';
import { setTranslation } from 'services/translation';
import { storeModuleFactory } from 'services/store';
import { computed } from 'vue';
import type { Ticket } from './types';

export const TICKET_DOMAIN_NAME = 'tickets';

setTranslation(TICKET_DOMAIN_NAME, {
    singular: 'ticket',
    plural: 'tickets',
});

export const ticketRoutes = [
    createOverviewRoute(TICKET_DOMAIN_NAME, OverviewPage),
    createCreateRoute(TICKET_DOMAIN_NAME, OverviewPage),
{
    path: '/tickets/mijn-tickets/:id',
    name: 'Mijn Tickets',
    params: {
        id: 0
    },
    component: OverviewPage,
    meta: {auth: true, canSeeWhenLoggedIn: true},
}];

const baseTicketStore = storeModuleFactory<Ticket>(TICKET_DOMAIN_NAME)

export const ticketStore = {
    setters: baseTicketStore.setters,
    actions:baseTicketStore.actions,
    getters: {
        ...baseTicketStore.getters,
        /** Get all tickets with the relevant category_id from the store.*/
        getTicketsByCategory: (id: number) => computed<Ticket[]>(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.category_id == id)),
        /** Get all tickets of the userID from the store.*/
        getUserTickets: (id: number) => computed(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.user!.id == id)),
        /** Get all tickets with the relevant category_id of the user_id from the store.*/
        getUserTicketsByCategory: (category: number, user: number) => computed<Ticket[]>(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.category_id == category && ticket.user_id == user)),
    }
}