<template>
    <section v-if="isLoading || randomPokemon?.id === null" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor...</h1>
        <h3 class="animate-pulse">Cargando pokémons</h3>
    </section>

    <section v-else class="flex flex-col sm:flex-row justify-center items-center sm:justify-evenly w-screen h-screen">

        <div :class="[
            'div-table',
            {
                'py-8' : gameStatus == GameStatus.Playing,
                'py-1' : gameStatus != GameStatus.Playing, 
            }
        ]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr>
                        <th scope="row" class="text-blue-700">Intentos</th>
                        <td>{{ countAnswer }}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-blue-700">Aciertos</th>
                        <td>{{ countWonLost }}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-green-700">Puntos</th>
                        <td>{{ points }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="element-center">
            <h1>¿Quién es este pokemon?</h1>
    
            <div class="flex flex-col sm:flex-row sm:gap-2">
                <button v-if="gameStatus !== GameStatus.Playing" @click="getNextRound(4)">Continuar</button>
                <button v-if="gameStatus !== GameStatus.Playing" @click="restartGame()" class="button-restart">Iniciar de nuevo</button>
            </div>
    
            <!-- pokemon picture -->
            <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" />
    
            <!-- pokemon option -->
            <PokemonOptions :options="options" @selected-option="checkAnswer" 
                :block-selection="gameStatus !== GameStatus.Playing"
                :correct-answer="randomPokemon.id" />
        </div>
    </section>
</template>

<script setup lang="ts">
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const { gameStatus, isLoading, randomPokemon, pokemonOptions: options, checkAnswer, getNextRound, countWonLost, countAnswer, points, restartGame } = usePokemonGame();

// const onSelectedOPtion = ( value: number ) => {
//     console.log(value);
// }
</script>

<style scoped>
button {
    @apply shadow-md w-40 p-2 mb-4 rounded-lg cursor-pointer text-center text-base sm:text-lg font-semibold transition-all bg-green-300 text-green-700 hover:bg-green-600 hover:text-green-100;
}
h1 {
    @apply text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center;
}
th {
    @apply font-medium whitespace-nowrap dark:text-white;
}
tr {
    @apply border-b dark:border-gray-700;
}
th, tr {
    @apply text-center text-base sm:text-lg md:text-xl font-bold uppercase;
}
td, th {
    @apply px-6 py-1 sm:py-2;
}

.button-restart {
    @apply bg-indigo-300 text-indigo-700 hover:bg-indigo-600 hover:text-indigo-100;
}
.element-center {
    @apply flex flex-col justify-center items-center max-w-lg;
}
.div-table {
    @apply element-center overflow-x-auto bg-gray-200 sm:py-14 px-8 mb-4 rounded-lg shadow-lg cursor-pointer border-r-4 sm:border-r-0 sm:border-l-4 border-gray-400;
}
</style>