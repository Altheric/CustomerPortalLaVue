<script setup lang="ts">
//Imports
import UserForm from '../components/UserForm.vue';
import { userStore, USER_DOMAIN_NAME } from '..';
import type { User } from '../types';
import { computed } from 'vue';
import { getCurrentRouteId, goToOverviewPage } from 'services/router';

//Store Setup
userStore.setters.setAll

//Refs
const user = computed(() => userStore.getters.byId(getCurrentRouteId()).value)

//Functions
const updateUserHandler = async(user: User) => {
    await userStore.actions.update(user.id, user);
    goToOverviewPage(USER_DOMAIN_NAME);
}
</script>

<template>
<UserForm :user="user" @submit="(user) => updateUserHandler(user)"/>
</template>