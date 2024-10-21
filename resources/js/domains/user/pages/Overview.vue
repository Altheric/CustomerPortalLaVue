<script setup lang="ts">
//Imports
import { userStore, USER_VALID_ROLES, USER_DOMAIN_NAME } from '..';
import { computed, ref } from 'vue';
import type { User } from '../types';
import { goToEditPage } from 'services/router';
//Store Setup
userStore.setters.setAll


//Refs
const role = ref('')

const users = computed(() => USER_VALID_ROLES.includes(role.value) ? userStore.getters.getUsersByRole(role.value).value : userStore.getters.all.value);
</script>

<template>
    <select v-model="role">
        <option disabled value="">Kies een rol</option>
        <option value="all">all</option>
        <option v-for="role in USER_VALID_ROLES" :value="role">{{ role }}</option>
    </select>
    <table>
        <thead>
            <tr>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
                <th colspan="2">Acties</th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="user in users">
                <td style="text-align: left;">{{ user.name }}</td>
                <td style="text-align: left;">{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <template v-if="user.role == 'user'">
                    <td><button @click="goToEditPage(USER_DOMAIN_NAME, user.id)">Bewerken</button></td>
                    <td><button @click="">Verwijderen</button></td>
                </template>
            </tr>
        </tbody>
    </table>
</template>