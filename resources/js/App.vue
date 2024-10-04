<script setup lang="ts">
import NavView from 'components/NavView.vue';
import { isLoggedIn } from 'services/auth';
</script>

<template>
  <NavView v-if="isLoggedIn"/>
  <main>
    <RouterView />
  </main>
</template>