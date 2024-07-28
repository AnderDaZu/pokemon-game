<template>
    <section v-if="false" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor...</h1>
        <h3 class="animate-pulse">Cargando pokémons</h3>
    </section>

    <section class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl font-semibold mb-4">¿Quién es este pokemon?</h1>

        <!-- pokemon picture -->
        <PokemonPicture />

        <!-- pokemon option -->
        <PokemonOptions />
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

const { gameStatus } = usePokemonGame();
</script>
