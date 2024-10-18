<script setup lang="ts">
//Imports
import { ref } from 'vue';
import type { Category } from '../types';

//Props
const props = defineProps<{
    category: Category
    actionType: string
}>()

//Emits
const emit = defineEmits([
    'submit'
]);

//Refs
const categoryName = ref<string>(props.category.category);
const actionType = ref<string>(props.actionType);

//Functions
function submit(){
    const newCategory: Category = {
        id: props.category.id,
        category: categoryName.value,
    }
    emit('submit', newCategory)
}
</script>

<template>
    <form @submit.prevent="submit">
        <label for="form-name"></label>
        <input id="form-name" type="text" v-model="categoryName">
        <input type="submit" v-model="actionType">
    </form>
</template>