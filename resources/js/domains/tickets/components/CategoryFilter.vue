<script setup lang="ts">
//Imports
import { categoryStore } from 'domains/category';
import { computed, ref } from 'vue';

//Emits
const emit = defineEmits([
    'filter'
]);

//Refs
const categoryFilter = ref<number>(0)

const categories = computed(() => categoryStore.getters.all.value);


</script>

<template>
    <div id="overview-filter">
        <select v-model.number="categoryFilter" @change="$emit('filter', categoryFilter)">
            <option disabled value="">Kies een categorie</option>
            <option :value="0">Alles</option>
            <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.category }}</option>
        </select>
    </div>
</template>