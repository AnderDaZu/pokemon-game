<template>
    <section class="mt-5 flex flex-col">
        <!-- <ul>
            <li v-for="pokemon in options" :key="pokemon.id">{{ pokemon.name }}</li>
        </ul> -->
        <button 
            v-for="{ name, id } in options" :key="id" 
            @click="$emit('selectedOption', id)"
            class="button capitalize">
                {{ name }}
        </button>
    </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';


interface Props {
    options: Pokemon[]
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
</style>