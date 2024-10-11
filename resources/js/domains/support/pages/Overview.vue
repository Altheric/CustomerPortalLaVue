<script setup lang="ts">
//Imports
import { computed } from 'vue';
import { supportStore } from '..';
import { userStore } from 'domains/user';
import { categoryStore } from 'domains/category';
import { messageStore } from 'domains/messages';
import PublicView from '../components/PublicView.vue';
import PrivateView from '../components/PrivateView.vue';
import SelectedView from '../components/SelectedView.vue';
import { getCurrentRouteId } from 'services/router';

userStore.actions.getAll();
supportStore.actions.getAll();
categoryStore.actions.getAll();
messageStore.actions.getAll();

//Vars
let selection: number = 0;

//Refs
const userID = computed<number | undefined>(() => {
    try{
        return getCurrentRouteId()
    } catch {
        return undefined
    }
})


</script>

<template>
    <div v-if="!selection">
        <PublicView v-if="!userID" @select="(ticketID) => selection = ticketID"/>
        <PrivateView v-else :id="userID" @select="(ticketID) => selection = ticketID"/>
    </div>
    <SelectedView v-else :ticketID="selection" @revert="selection = 0"/>
</template>