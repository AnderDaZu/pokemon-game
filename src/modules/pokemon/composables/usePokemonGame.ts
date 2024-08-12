import { computed, onMounted, ref } from 'vue';
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([]);
    const pokemonOptions = ref<Pokemon[]>([]);
    const isLoading = computed(() => pokemons.value.length === 0);
    const countWonLost = ref<number>(0);
    const countAnswer = ref<number>(0);
    const points = ref<number>(0);
    const gameStatusBefore = ref<GameStatus>(GameStatus.Playing);

    const randomPokemon = computed(() => {
        const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
        return pokemonOptions.value[randomIndex];
    });

    const getPokemons = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

        const pokemonsArray = response.data.results.map((pokemon) => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id, // en este caso el operador + trata de convertir el string en numero
                // id: urlParts[urlParts.length - 2],
            };
        });

        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextRound = (howMany: number = 4) => {
        gameStatusBefore.value = gameStatus.value;
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
    };

    const restartGame = () => {
        gameStatus.value = GameStatus.Playing;
        countWonLost.value = 0;
        countAnswer.value = 0;
        points.value = 0;
        getNextRound();
    };

    const checkAnswer = (id: number) => {
        countAnswer.value++;

        const hasWon = randomPokemon.value.id == id;

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: hasWon ? 4000 : 3000,
            timerProgressBar: false,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: hasWon ? 'success' : 'error',
            title: hasWon ? 'Fantastico, sigue sumando 😉' : 'Ops intenta de nuevo 😔',
        });

        if (hasWon) {
            gameStatus.value = GameStatus.Won;
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 },
            });

            countWonLost.value++;

            if ( gameStatusBefore.value == GameStatus.Playing ) points.value = points.value + 4;

            if ( gameStatusBefore.value == GameStatus.Won ) points.value = points.value + 3;

            if ( gameStatusBefore.value == GameStatus.Lost ) points.value = points.value + 2;

            return;
        }

        // if ( countWonLost.value > 0 ) countWonLost.value--;

        gameStatus.value = GameStatus.Lost;
    };

    onMounted(async () => {
        // console.log('onMounted');
        // await new Promise( r => setTimeout(r, 5000) ); // para demorar la ejecución
        pokemons.value = await getPokemons();
        getNextRound();
        // console.log(pokemonOptions.value);
        // console.log('finished mounted process');
        
    });

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        countWonLost,
        countAnswer,
        points,

        // methods
        getNextRound,
        checkAnswer,
        restartGame,
    };
};
