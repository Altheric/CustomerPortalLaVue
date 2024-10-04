<script setup lang="ts">
import { isLoggedIn } from '..';
import LoginForm from '../components/LoginForm.vue';
import { login, logout } from '..';
</script>



<template>
    <h1 v-if="isLoggedIn">Logged in!</h1>
    <button @click="logout()" v-if="isLoggedIn">Uitloggen</button>
    <LoginForm @submit="(loginCreds) => login(loginCreds)" v-else/>
</template>