//Imports
import {storeModuleFactory} from 'services/store';
import { computed } from 'vue';
import { getRequest } from 'services/http';
//Type Imports
import type { Message } from './types';


export const MESSAGE_DOMAIN_NAME = 'messages';


//Store Definition
export const baseMessageStore = storeModuleFactory<Message>(MESSAGE_DOMAIN_NAME);

export const messageStore = {
    setters: baseMessageStore.setters,
    actions: {
        ...baseMessageStore.actions,
        getTicketMessages: async (id:number) => {
            const {data} = await getRequest(MESSAGE_DOMAIN_NAME + '/ticket/' + id);
            if (!data) return;
            messageStore.setters.setAll(data);
        }
    },
    getters: {
        ...baseMessageStore.getters,
        /** Get all tickets with the relevant ticket-id from the store.*/
        getMessagesByTicket: (id: number) => computed<Message[]>(() => Object.values(baseMessageStore.state.value).filter((message) => message.ticket_id == id)),
        /** Get all tickets with the relevant user-id from the store.*/
        getMessagesByUser: (id: number) => computed<Message[]>(() => Object.values(baseMessageStore.state.value).filter((message) => message.user_id == id)),
        /** Get all tickets with the relevant type from the store.*/
        getMessagesByType: (type: string) => computed<Message[]>(() => Object.values(baseMessageStore.state.value).filter((message) => message.type == type)),
        /** Get all tickets with the relevant ticket-id and type from the store.*/
        getMessagesByTnT: (id: number, type: string) => computed<Message[]>(() => Object.values(baseMessageStore.state.value).filter((message) => message.ticket_id == id && message.type == type))
    }
}