<script setup lang="ts">
//Imports
import { supportStore } from '..';
import { computed } from 'vue';



supportStore.setters.setAll();

//Refs
const tickets = computed(() => supportStore.getters.all);
console.log(tickets.value);
</script>

<template>
    <div v-for="ticket in tickets">
        <p>{{ ticket }}</p>
    </div>
</template>