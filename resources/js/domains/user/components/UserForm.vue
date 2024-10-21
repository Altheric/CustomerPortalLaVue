<script setup lang="ts">
//Imports
import { ref } from 'vue';
import { USER_VALID_ROLES } from '..';
import type { User } from '../types';
//Props
const props = defineProps<{
    user: User
}>()

//Emits
const emit = defineEmits([
    'submit'
])

//Refs
const userName = ref<string>(props.user.name);
const userEmail = ref<string>(props.user.email);
const userRole = ref<string>(props.user.role);
//Functions
function submit(){
    const newUser: User = {
        id: props.user.id,
        name: userName.value,
        email: userEmail.value,
        role: userRole.value
    }
    emit('submit', newUser);
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-username">Naam:</label>
        <input type="text" id="form-username" v-model="userName" required min="3" max="60"><br>
        <label for="form-email">Email:</label>
        <input type="email" id="form-email" v-model="userEmail" required min="3" max="60"><br>
        <select v-model="userRole">
            <option disabled value="">Kies een rol</option>
            <option v-for="role in USER_VALID_ROLES" :value="role">{{ role }}</option>
        </select>
    </form>
</template>