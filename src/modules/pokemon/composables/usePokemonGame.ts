import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {

    const gameStatus = ref<GameStatus>( GameStatus.Playing );
    const pokemons = ref<Pokemon[]>([]);
    const pokemonOptions = ref<Pokemon[]>([]);
    const isLoading = computed( () => pokemons.value.length === 0 );

    const randomPokemon = computed( () => {
        const randomIndex = Math.floor( Math.random() * pokemonOptions.value.length );
        return pokemonOptions.value[ randomIndex ];
    });

    const getPokemons = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151'); 

        const pokemonsArray = response.data.results.map( pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id, // en este caso el operador + trata de convertir el string en numero
                // id: urlParts[urlParts.length - 2],

            }
        });

        return pokemonsArray.sort( () => Math.random() - 0.5 );
    }

    const getNextOptions = ( howMany: number = 4 ) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
    }

    const checkAnswer = ( id: number ) => {
        const hasWon = randomPokemon.value.id == id;

        if ( hasWon ){
            gameStatus.value = GameStatus.Won;
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
            return;
        }

        gameStatus.value = GameStatus.Lost;
    }

    onMounted( async () => {
        // await new Promise( r => setTimeout(r, 5000) ); // para demorar la ejecución
        pokemons.value = await getPokemons();
        getNextOptions();
        console.log( pokemonOptions.value );
    });

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,

        // methods
        getNextOptions,
        checkAnswer,
    }
}