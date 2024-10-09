import {storeModuleFactory} from 'services/store';
import { computed } from 'vue';
import type { Message } from './types';


export const MESSAGE_DOMAIN_NAME = 'messages';

export const baseMessageStore = storeModuleFactory<Message>(MESSAGE_DOMAIN_NAME);

export const messageStore = {
    setters: baseMessageStore.setters,
    actions:baseMessageStore.actions,
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