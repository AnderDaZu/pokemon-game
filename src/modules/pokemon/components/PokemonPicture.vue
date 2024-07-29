<template>
    <section>
        <img :src="pokemonImage" 
            v-if="!showPokemon"
            class="brightness-0 h-[200px]"
            alt="">
        <img :src="pokemonImage" 
            v-else
            class="fade-in h-[200px]"
            alt="">
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';


interface Props {
    pokemonId: number;
    showPokemon?: boolean;
}

const props = withDefaults( defineProps<Props>(), {
    showPokemon: false,
});

const pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ props.pokemonId }.svg`;
});

</script>

<style scoped>
img {
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>