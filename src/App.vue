<template>
  <div id="app">
    <navbar />
    <movies />
  </div>
</template>

<script>
import Index from './components/movies/Index'
import Navbar from "./components/Navbar";
import './assets/css/main.scss'

export default {
  name: 'app',
  components: {
    'movies' : Index,
    Navbar,
  },
}
</script>

<style>

</style>
