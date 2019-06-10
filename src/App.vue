<template>
    <div id="app">
        <navbar />
        <movies v-if="selectedMovie" />
        <router-view v-else />
    </div>
</template>

<script>
import Index from './components/movies/Index';
import Navbar from "./components/Navbar";
import './assets/css/main.scss';

export default {
    name: 'app',
    components: {
       'movies' : Index,
       Navbar,
    },
    data: () => ({
        selectedMovie: null,
    }),
}
</script>

<style>

</style>
