<script setup lang="ts">
//Imports
import { computed, ref } from 'vue';
import type { Message } from '../types';
import type { User } from 'domains/user/types';

//Props
const props = defineProps<{
    actionType: string
    ticketID?: number
    user: User
    message?: Message
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const id = computed<number> (() => props.message ? props.message.id : 0 );
const content = props.message ? ref<string>(props.message.content) : ref<string>('');
const submitType = computed<string>(() => props.actionType == 'response' ? 
    props.message? 'Update reactie' : 'Plaats reactie' : props.message? 'Update notitie' : 'Plaats notitie'
);
const ticketID = computed<number>(() => props.ticketID ? props.ticketID : props.message? props.message.ticket_id : 0);

//Functions
const newMessage: Message = {
    id: id.value,
    content: content.value,
    type: props.actionType,
    ticket_id: ticketID.value,
    user_id: props.user.id
} 
function submit(){
    emit('submit', newMessage);
}
</script>

<template>
    <form @submit.prevent="submit" :id="'admin-'+actionType+'-form'">
        <input type="text" id="form-text" v-model="content" required min="8"><br>
        <input type="submit" v-model="submitType">
    </form>
</template>