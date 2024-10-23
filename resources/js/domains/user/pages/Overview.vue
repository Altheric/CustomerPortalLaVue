<script setup lang="ts">
//Imports
import { userStore, USER_DOMAIN_NAME } from '..';
import { computed } from 'vue';
import type { User } from '../types';
import { goToEditPage } from 'services/router';
import { ticketStore } from 'domains/tickets';
import { infoToast } from 'services/toast';
import { confirmModal } from 'services/modal';

//Store Setup
userStore.actions.getAll();
ticketStore.actions.getAll();

//Refs
const users = computed(() => userStore.getters.all.value);

//Functions
const destroy = async (user: User) =>{
    if(ticketStore.getters.getUserTickets(user.id).value.filter((ticket) => ticket.status == 'unhandled' || ticket.status == 'in progress').length > 0){
        infoToast('Deze gebruiker heeft nog tickets in behandeling')
    } else {
        const confirmation = await confirmModal('Wil je echt ' + user.name + ' verwijderen?', 'Ja', 'Nee')
        if(confirmation){
            await userStore.actions.delete(user.id);
        }
    }
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
                <th colspan="2">Acties</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td style="text-align: left;">{{ user.name }}</td>
                <td style="text-align: left;">{{ user.email }}</td>
                <td v-if="user.is_admin">Admin</td>
                <td v-else>User</td>
                <td><button @click="goToEditPage(USER_DOMAIN_NAME, user.id)">Bewerken</button></td>
                <td><button @click="destroy(user)">Verwijderen</button></td>
            </tr>
        </tbody>
    </table>
</template>