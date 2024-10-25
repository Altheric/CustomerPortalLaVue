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
const category = ref({
    id: props.category.id,
    category: props.category.category
});
const actionType = ref<string>(props.actionType);

</script>

<template>
    <form @submit.prevent="$emit('submit', category)">
        <label for="form-name"></label>
        <input id="form-name" type="text" v-model="category.category">
        <input type="submit" v-model="actionType">
    </form>
</template>