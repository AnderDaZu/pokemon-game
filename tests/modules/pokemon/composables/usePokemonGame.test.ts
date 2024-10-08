import { flushPromises } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import confetti from 'canvas-confetti';

import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../../../data/fake-pokemons';

const mockPokemonApi = new MockAdapter(pokemonApi);
mockPokemonApi.onGet('/?limit=151').reply(200, {
    results: pokemonListFake,
});

vi.mock('canvas-confetti', () => ({
    default: vi.fn(),
}));

describe('usePokemonGame', () => {
    test('should initialize with the correct default values', async () => {
        // const { checkAnswer, gameStatus, getNextRound, isLoading, pokemonOptions, randomPokemon } = usePokemonGame();
        const [results, app] = withSetup(usePokemonGame);

        expect(results.gameStatus.value).toBe(GameStatus.Playing);
        expect(results.isLoading.value).toBe(true);
        expect(results.pokemonOptions.value).toEqual([]);
        expect(results.randomPokemon.value).toBe(undefined);

        // await new Promise( (r) => setTimeout( r, 1000) );
        await flushPromises();

        expect(results.isLoading.value).toBe(false);
        expect(results.pokemonOptions.value.length).toBe(4);
        expect(results.randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
        });
    });

    test('should correctly handle getNettRound', async () => {
        const [results] = withSetup(usePokemonGame);

        await flushPromises();
        results.gameStatus.value = GameStatus.Won;

        // estimulos
        results.getNextRound(5);

        expect(results.gameStatus.value).toBe(GameStatus.Playing);
        expect(results.pokemonOptions.value).toHaveLength(5);
    });

    test('should correctly handle getNextRound and return different pokemons', async () => {
        const [results] = withSetup(usePokemonGame);
        await flushPromises();

        const firstOptions = [...results.pokemonOptions.value].map((p) => p.name);

        results.getNextRound(4);

        const secondOptions = [...results.pokemonOptions.value];

        secondOptions.forEach((pokemon) => {
            expect(firstOptions).not.toContain(pokemon.name);
        });

        expect(results.pokemonOptions.value).toHaveLength(4);
    });

    test('should correctly handle a incorrect answer', async () => {
        const [results] = withSetup(usePokemonGame);
        await flushPromises();

        const { checkAnswer, gameStatus } = results;
        expect(gameStatus.value).toBe(GameStatus.Playing);
        console.log(gameStatus.value);

        checkAnswer(1000);
        expect(gameStatus.value).toBe(GameStatus.Lost);
        console.log(gameStatus.value);
    });

    test('should correctly handle a correct answer', async () => {
        const [results] = withSetup(usePokemonGame);
        await flushPromises();

        const { checkAnswer, gameStatus, randomPokemon } = results;
        expect(gameStatus.value).toBe(GameStatus.Playing);

        checkAnswer(randomPokemon.value.id);
        expect(confetti).toHaveBeenCalledWith({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
        });
        expect(gameStatus.value).toBe(GameStatus.Won);
    });
});
