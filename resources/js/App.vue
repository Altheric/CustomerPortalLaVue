<script setup lang="ts">
//Imports
import NavView from 'components/NavView.vue';
import { getLoggedInUser, isLoggedIn } from 'domains/auth';
import { computed, ref } from 'vue';

const user = computed(() => isLoggedIn ? getLoggedInUser.value : null) 

</script>

<template>
  <NavView  :user="user!" v-if="isLoggedIn"/>
  <main>
    <RouterView />
  </main>
</template>