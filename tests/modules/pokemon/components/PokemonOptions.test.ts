import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";
import { mount } from "@vue/test-utils";

const options = [
    {
        id: 1,
        name: 'Bulbasaur',
    },
    {
        id: 2,
        name: 'Charmander',
    },
    {
        id: 3,
        name: 'Squirtle',
    }
]

describe('<PokemonOptions />', () => {

    test('should render buttons with correct text', () => {
        const wrapper = mount( PokemonOptions, {
            props: { options: options, blockSelection: false, correctAnswer: 1 }
        });

        // console.log( wrapper.html() );
        const buttons = wrapper.findAll('button');

        expect( buttons.length ).toBe( options.length );

        buttons.forEach( ( button, index ) => {
            expect( button.text() ).toBe( options[index].name );
        })
    });

    test('should emit selectedOption event when a button is clicked', async () => {
        const wrapper = mount( PokemonOptions, {
            props: { options: options, blockSelection: false, correctAnswer: 1 }
        });
        const [ b1, b2, b3 ] = wrapper.findAll('button');

        await b1.trigger('click');
        await b2.trigger('click');
        await b3.trigger('click');

        // console.log( wrapper.emitted('selectedOption') );

        expect( wrapper.emitted('selectedOption') ).toBeTruthy();

        expect( wrapper.emitted().selectedOption[0] ).toEqual([1]);

        expect( wrapper.emitted().selectedOption[1] ).toEqual([2]);

        expect( wrapper.emitted().selectedOption[2] ).toEqual([3]);
        

    });
});