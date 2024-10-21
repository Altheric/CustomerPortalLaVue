<script setup lang="ts">
//Imports
import { ref } from 'vue';
import MessageForm from './MessageForm.vue';
import MessageView from './MessageView.vue';
import { messageStore } from '..';
import type { User } from 'domains/user/types';
import type { Message } from '../types';

messageStore.actions.getAll();

//Props
const props = defineProps<{
    user: User
    ticketID: number
}>()

//Refs
const editMsg = ref();

//Functions
async function messsageCreateHandler(newMessage: Message){
    try{
        await messageStore.actions.create(newMessage);
    } catch(error) {
        console.error(error)
    }
}

async function messsageUpdateHandler(message: Message){
    try{
        await messageStore.actions.update(message.id, message);
    } catch(error) {
        console.error(error)
    }
}

async function messageDestructionHandler(id: number){
    try{
        await messageStore.actions.delete(id);
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
    <MessageView :userID="user!.id" :ticketID="ticketID" message-type="response" @edit="(message) => editMsg = message" @destroy="(id) => messageDestructionHandler(id)"/>
    <div v-if="user.role == 'admin'">
        <MessageForm 
            v-if="editMsg?.type !== 'response'" 
            actionType='response' :ticketID="ticketID" 
            :user="user" 
            @submit="(response) => messsageCreateHandler(response)"
        />
        <MessageForm v-if="editMsg?.type == 'response'" actionType='response' :message="editMsg" :user="user" @submit="(message) => messsageUpdateHandler(message)"/>
        <MessageView :userID="user!.id" :ticketID="ticketID" message-type="note" @edit="(message) => editMsg = message" @destroy="(id) => messageDestructionHandler(id)"/>
        <MessageForm 
            v-if="editMsg?.type !== 'note'" 
            actionType='note' :ticketID="ticketID" 
            :user="user" 
            @submit="(note) => messsageCreateHandler(note)"
        />
        <MessageForm v-if="editMsg?.type == 'note'" actionType='note' :message="editMsg" :user="user" @submit="(message) => messsageUpdateHandler(message)"/>
    </div>
</template>