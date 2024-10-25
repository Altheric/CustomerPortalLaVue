<script setup lang="ts">
//Imports
import { ref } from 'vue';
import MessageForm from './MessageForm.vue';
import MessageView from './MessageView.vue';
import { messageStore } from '..';
import type { SessionCreds } from 'domains/auth/types';
import type { Message } from '../types';



//Props
const props = defineProps<{
    user: SessionCreds
    ticketID: number
}>()

messageStore.actions.getTicketMessages(props.ticketID);

//Refs
const editMsg = ref();

//Functions
async function messageHandler(action: string, message: Message){
    switch(action){
        case 'create':
            await messageStore.actions.create(message);
            break;
        case 'update':
            await messageStore.actions.update(message.id, message);
            break;
        case 'destroy':
            await messageStore.actions.delete(message.id);
            break;
    }   
    
}
</script>

<template>
    <MessageView :userID="user!.id" :ticketID="ticketID" message-type="response" @edit="(response) => editMsg = response" @destroy="(response) => messageHandler('destroy', response)"/>
    <div v-if="user.is_admin">
        <MessageForm 
            v-if="editMsg?.type !== 'response'" 
            actionType='response' :ticketID="ticketID" 
            :user="user" 
            @submit="(response) => messageHandler('create', response)"
        />
        <MessageForm v-if="editMsg?.type == 'response'" actionType='response' :message="editMsg" :user="user" @submit="(response) => messageHandler('update', response)"/>
        <MessageView :userID="user!.id" :ticketID="ticketID" message-type="note" @edit="(message) => editMsg = message" @destroy="(note) => messageHandler('update', note)"/>
        <MessageForm 
            v-if="editMsg?.type !== 'note'" 
            actionType='note' :ticketID="ticketID" 
            :user="user" 
            @submit="(note) => messageHandler('update', note)"
        />
        <MessageForm v-if="editMsg?.type == 'note'" actionType='note' :message="editMsg" :user="user" @submit="(note) => messageHandler('update', note)"/>
    </div>
</template>