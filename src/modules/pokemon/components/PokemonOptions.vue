<template>
    <section class="mt-5 flex flex-col">
        <!-- <ul>
            <li v-for="pokemon in options" :key="pokemon.id">{{ pokemon.name }}</li>
        </ul> -->
        <button 
            v-for="{ name, id } in options" :key="id" 
            @click="$emit('selectedOption', id)"
            :class="[
                'capitalize disabled:shadow-none disabled:bg-gray-100 disabled:hover:bg-gray-100', 
                {
                    correct: id === correctAnswer && blockSelection,
                    incorrect: id !== correctAnswer && blockSelection,
                }
            ]"
            :disabled="blockSelection">
                {{ name }}
        </button>
    </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';


interface Props {
    options: Pokemon[],
    blockSelection: boolean,
    correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
    selectedOption: [ id: number ];
}>();

</script>

<style scoped>
button {
    @apply bg-slate-200 shadow-md p-2 my-2 rounded-lg cursor-pointer text-center w-40 transition-all hover:bg-slate-300;
}
.correct {
    @apply bg-blue-500 hover:bg-blue-500 text-white;
}
.incorrect {
    @apply bg-gray-300 hover:bg-gray-300 opacity-70;
}
.selected {
    @apply border-gray-500 border-2;
}
</style>