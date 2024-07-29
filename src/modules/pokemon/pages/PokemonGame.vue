<template>
    <section v-if="isLoading || randomPokemon.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor...</h1>
        <h3 class="animate-pulse">Cargando pokémons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl font-semibold mb-4">¿Quién es este pokemon?</h1>

        <h3 class="capitalize">{{ gameStatus }}</h3>

        <!-- pokemon picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />

        <!-- pokemon option -->
        <PokemonOptions :options="options" @selected-option="checkAnswer" />
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions: options, checkAnswer } = usePokemonGame();

// const onSelectedOPtion = ( value: number ) => {
//     console.log(value);
// }
</script>
