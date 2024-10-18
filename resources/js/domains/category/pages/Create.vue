<script setup lang="ts">
//Imports
import { CATEGORY_DOMAIN_NAME, categoryStore } from '..';
import CategoryForm from '../components/CategoryForm.vue';
import type { Category } from '../types';
import { goToOverviewPage } from 'services/router';

//Vars
const newCategory: Category = {
    id: 0,
    category: ''
}

//Functions
async function storeCategoryHandler(category : Category){
    try{
        await categoryStore.actions.create(category);
        goToOverviewPage(CATEGORY_DOMAIN_NAME);
    } catch(error) {
        console.error(error)
    }
}
</script>

<template>
<CategoryForm :category="newCategory" action-type="Toevoegen" @submit="(submittedCategory) => storeCategoryHandler(submittedCategory)"/>
</template>