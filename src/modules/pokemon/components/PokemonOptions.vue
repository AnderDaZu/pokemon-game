<template>
    <section class="mt-5">
        <ul>
            <li>Pokemón 1</li>
            <li>Pokemón 2</li>
            <li>Pokemón 3</li>
            <li>Pokemón 4</li>
            <li>Pokemón 5</li>
        </ul>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
li {
    @apply bg-slate-200 shadow-md p-2 my-2 rounded-lg cursor-pointer text-center w-40 transition-all hover:bg-slate-300;
}
</style>