import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { GameStatus } from "@/modules/pokemon/interfaces";
import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue";
import { mount } from "@vue/test-utils";
import type { Mock } from "vitest";

vitest.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
    {
        id: 1,
        name: 'bulbasaur',
    },
    {
        id: 2,
        name: 'ivysaur',
    },
    {
        id: 3,
        name: 'venusaur',
    },
    {
        id: 4,
        name: 'charmander',
    },
];

describe('<PokemonGame />', () => {

    test('should initialize with default values', async () => {
        (usePokemonGame as Mock).mockReturnValue({
            randomPokemon: undefined,
            isLoading: true,
            gameStatus: GameStatus.Playing,
            pokemonOptions: [],
            checkAnswer: vi.fn(),
            getNextRound: vi.fn(),
        });

        const wrapper = mount(PokemonGame);

        expect( wrapper.get('h1').text() ).toBe('Espere por favor...');
        expect( wrapper.get('h1').classes('') ).toEqual(['text-3xl']);

        expect( wrapper.get('h3').text() ).toBe('Cargando pokémons');
        expect( wrapper.get('h3').classes('') ).toEqual(['animate-pulse']);
    });

    test('should render <PokemonPicture /> and <PokemonOptions />', async () => {
        (usePokemonGame as Mock).mockReturnValue({
            randomPokemon: pokemonsOptions.at(0),
            isLoading: false,
            gameStatus: GameStatus.Playing,
            pokemonOptions: pokemonsOptions,
            checkAnswer: vi.fn(),
            getNextRound: vi.fn(),
        });

        const wrapper = mount(PokemonGame);
        const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';
        const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100.disabled\\:hover\\:bg-gray-100');
        const pokemons = pokemonsOptions.map( (p) => p.name);
        const buttonClass = 'capitalize disabled:shadow-none disabled:bg-gray-100 disabled:hover:bg-gray-100';

        expect( wrapper.find('img').attributes('src') ).toBe(imgUrl);

        expect( wrapper.findAll('button').length ).toBe(pokemonsOptions.length);
        expect( buttons.length ).toEqual( pokemonsOptions.length );
        expect( buttons.length ).toBe( pokemonsOptions.length );
        expect( buttons ).length( pokemonsOptions.length );

        buttons.forEach( button => {
            expect( pokemons ).toContain(button.text());
        });

        expect( wrapper.find('button').classes().join(' ') ).toBe( buttonClass );
        expect( wrapper.get('h1').text() ).toBe('¿Quién es este pokemon?');
    });
});