<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { Message } from '../types';
import type { User } from 'domains/user/types';
//Props
const props = defineProps<{
    actionType: string
    ticketID: number
    user: User
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const content = ref<string>('');
const actionType = ref<string>(props.actionType);
const ticketID = ref<number>(props.ticketID);
const user = ref<User>(props.user)

//Functions
function submit(){
    const newMessage: Message = {
        id: 0,
        content: content.value,
        type: actionType.value,
        ticket_id: ticketID.value,
        user_id: user.value.id
    } 
    emit('submit');
}
</script>

<template>
    <form @submit.prevent="submit">
        <input type="text" id="form-text" v-model="content" required min="8"><br>
        <input type="submit" value="Post">
    </form>
</template>