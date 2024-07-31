import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue';
import { mount } from '@vue/test-utils';

describe('<PokemonPicture />', () => {

    test('should render the hidden image when showPokemon prop is false', () => {  

        const pokemonId = 25;
        const wrapper = mount(PokemonPicture, {
            props: { pokemonId: pokemonId, showPokemon: false },
        });

        // console.log(wrapper.html());
        const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

        const image = wrapper.find('img');
        const imageAttributes = image.attributes(); // para capturar todos los atributos

        // expect(image.exists()).toBeTruthy();
        // expect( image.attributes('src') ).toBe( imageSrc );
        expect( imageAttributes ).toEqual(
            expect.objectContaining({
                class: 'brightness-0 h-[120px] sm:h-[160px] md:h-[200px]',
                src: imageSrc,
            }),
        );
    });

    test('should render the image when showPokemon prop is true', () => {  
        const pokemonId = 25;
        const wrapper = mount(PokemonPicture, {
            props: { pokemonId: pokemonId, showPokemon: true },
        });

        console.log(wrapper.html());
        const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

        const image = wrapper.find('img');
        const imageAttributes = image.attributes(); // para capturar todos los atributos

        // para evaluar todos los atributos de una imagen
        expect( imageAttributes ).toEqual(
            expect.objectContaining({
                class: 'fade-in h-[120px] sm:h-[160px] md:h-[200px]',
                src: imageSrc,
            }),
        );
    });
});