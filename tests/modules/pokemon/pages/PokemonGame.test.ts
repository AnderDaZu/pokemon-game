import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { GameStatus } from "@/modules/pokemon/interfaces";
import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue";
import { mount } from "@vue/test-utils";
import type { Mock } from "vitest";

vitest.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn(),
}));

describe('<PokemonGame />', () => {

    (usePokemonGame as Mock).mockReturnValue({
        randomPokemon: undefined,
        isLoading: true,
        gameStatus: GameStatus.Playing,
        pokemonOptions: [],
        checkAnswer: vi.fn(),
        getNextRound: vi.fn(),
    });

    test('should initialize with default values', async () => {
        const wrapper = mount(PokemonGame);

        expect( wrapper.get('h1').text() ).toBe('Espere por favor...');
        expect( wrapper.get('h1').classes('') ).toEqual(['text-3xl']);

        expect( wrapper.get('h3').text() ).toBe('Cargando pokémons');
        expect( wrapper.get('h3').classes('') ).toEqual(['animate-pulse']);
    });
});