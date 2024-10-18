<script setup lang="ts">
//Imports
import { goToCreatePage, goToEditPage } from 'services/router';
import { CATEGORY_DOMAIN_NAME, categoryStore } from '..';
import { computed } from 'vue';

//Store setup
categoryStore.setters.setAll;

//Refs
const categories = computed(() => categoryStore.getters.all.value);

</script>

<template>
    <button @click="goToCreatePage(CATEGORY_DOMAIN_NAME)">Nieuwe Categorie</button>
    <ul class="category-list" style="list-style-type:none;text-align: right;">
        <li v-for="category in categories" :key="category.id">
            {{ category.category }}
            <button @click="goToEditPage(CATEGORY_DOMAIN_NAME, category.id)">Bewerken</button>
            <button @click="categoryStore.actions.delete(category.id)">Verwijderen</button>
        </li>
    </ul>
</template>