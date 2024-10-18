<script setup lang="ts">
//Imports
import { CATEGORY_DOMAIN_NAME, categoryStore } from '..';
import CategoryForm from '../components/CategoryForm.vue';
import type { Category } from '../types';
import { getCurrentRouteId, goToOverviewPage } from 'services/router';

//Refs
const category = categoryStore.getters.byId(getCurrentRouteId());

//Functions
async function updateCategoryHandler(category : Category){
    try{
        await categoryStore.actions.update(category.id, category);
        goToOverviewPage(CATEGORY_DOMAIN_NAME);
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
<CategoryForm :category="category" action-type="Updaten" @submit="(submittedCategory) => updateCategoryHandler(submittedCategory)"/>
</template>