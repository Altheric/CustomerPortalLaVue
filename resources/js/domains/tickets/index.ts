import { createOverviewRoute, createCreateRoute, createShowRoute, createEditRoute } from 'services/router/factory';
import OverviewPage from './pages/Overview.vue';
import CreatePage from './pages/Create.vue';
import EditPage from './pages/Edit.vue';
import { setTranslation } from 'services/translation';
import { storeModuleFactory } from 'services/store';
import { computed } from 'vue';
import type { Ticket } from './types';
import { postRequest, putRequest } from 'services/http';

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

const baseTicketStore = storeModuleFactory<Ticket>(TICKET_DOMAIN_NAME)

export const ticketStore = {
    setters: baseTicketStore.setters,
    actions: baseTicketStore.actions,
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

export async function createTicket(ticket: Ticket){
    const {data} = await postRequest('store-ticket', ticket)
    
    return data.status;
}

export async function updateTicket(id: number, ticket: Ticket){
    const {data} = await putRequest('update-ticket/' + id, ticket)
    
    return data.status;
}

export async function updateAssignment(id: number, newID: {admin_id: number}){
    const {data} = await putRequest('assign-ticket/' + id, newID)
    
    return data.status;
}