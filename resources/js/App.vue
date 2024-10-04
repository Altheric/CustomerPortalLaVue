<script setup lang="ts">
//Imports
import NavView from 'components/NavView.vue';
import { isLoggedIn } from 'domains/auth';
</script>

<template>
  <NavView v-if="isLoggedIn"/>
  <main>
    <RouterView />
  </main>
</template>