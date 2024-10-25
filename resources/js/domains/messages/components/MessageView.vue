<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { messageStore } from '..';
import { userStore } from 'domains/user';

//Props
const props = defineProps<{
    ticketID: number
    messageType: string
    userID: number
}>()
//Emits
const emit = defineEmits([
    'edit', 'destroy'
])

//Refs
const messages = computed(() => messageStore.getters.getMessagesByTnT(props.ticketID ,props.messageType).value)
const selectedAdmin = (id: number) => computed(() => userStore.getters.byId(id).value)
const header = computed<string>(() => props.messageType == 'response' ? 'Reacties' : 'Notities')
</script>

<template>
    <div id="view">
        <div :id="'admin-'+messageType" v-if="messages.length > 0">
            <h2>{{ header }}</h2>
            <template v-for="message in messages">
                <div v-if="userID == message.user_id">
                    <button @click="$emit('edit', message)">Edit</button>
                    <button @click="$emit('destroy', message)">Delete</button>
                </div>
                <p>{{ selectedAdmin(message.user_id).value.name }}</p>
                <p>{{ message.content }}</p>
            </template>
        </div>
    </div>
</template>