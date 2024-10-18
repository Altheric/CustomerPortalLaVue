//Imports
import { setTranslation } from 'services/translation';
import { storeModuleFactory } from 'services/store';
import { computed } from 'vue';
import { postRequest, putRequest } from 'services/http';
import { createOverviewRoute, createCreateRoute, createShowRoute, createEditRoute } from 'services/router/factory';
//Page Imports
import OverviewPage from './pages/Overview.vue';
import CreatePage from './pages/Create.vue';
import EditPage from './pages/Edit.vue';
//Type Imports
import type { Ticket } from './types';


//Route Definition
export const TICKET_DOMAIN_NAME = 'tickets';

setTranslation(TICKET_DOMAIN_NAME, {
    singular: 'ticket',
    plural: 'tickets',
});

export const ticketRoutes = [
    createOverviewRoute(TICKET_DOMAIN_NAME, OverviewPage),
    createShowRoute(TICKET_DOMAIN_NAME, OverviewPage),
    createCreateRoute(TICKET_DOMAIN_NAME, CreatePage),
    createEditRoute(TICKET_DOMAIN_NAME, EditPage)
]

//Store Definition
const baseTicketStore = storeModuleFactory<Ticket>(TICKET_DOMAIN_NAME)

export const ticketStore = {
    setters: baseTicketStore.setters,
    actions: {
        ...baseTicketStore.actions,
        updateAssignment: async (id: number, item: {admin_id: number | null | undefined, status: string | null}) => {
            const {data} = await putRequest(`tickets/${id}/assign`, item);
            if (!data) return;
            ticketStore.setters.setById(data);
        }
    },
    getters: {
        ...baseTicketStore.getters,
        /** Get all tickets with the relevant category_id from the store.*/
        getTicketsByCategory: (id: number) => computed<Ticket[]>(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.category_id == id)),
        /** Get all tickets of the userID from the store.*/
        getUserTickets: (id: number) => computed(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.user!.id == id)),
        /** Get all tickets with the relevant category_id of the user_id from the store.*/
        getUserTicketsByCategory: (category: number, user: number) => computed<Ticket[]>(() =>{
            return Object.values(baseTicketStore.state.value).filter((ticket) => ticket.category_id == category && ticket.user_id == user)
        }),
        /** Get all tickets of the relevant admin_id */
        getAssignedTickets: (adminID: number) => computed(() => Object.values(baseTicketStore.state.value).filter((ticket) => ticket.admin_id == adminID)),
         /** Get all tickets with the relevant category_id of the admin_id from the store.*/
        getAssignedTicketsByCategory: (category: number, adminID: number) => computed<Ticket[]>(() =>{
            return Object.values(baseTicketStore.state.value).filter((ticket) => ticket.category_id == category && ticket.admin_id == adminID)
        }),
    }
}