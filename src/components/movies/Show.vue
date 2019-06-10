<template>
    <section v-if="movie">
        <div
            id="backdrop"
            class="position-relative">
            <h1
                id="title"
                class="position-absolute text-white">{{ movie.title }}</h1>
            <img
                class="w-100 h-100"
                :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
                :alt="movie.title">
        </div>
        <div class="p-4">
            <p>{{ movie.overview }}</p>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';

    export default {
        name: "Show",
        props: {
            id: {type: Number},
        },
        data: () => ({
            movie: null,
            loading: false,
        }),
        mounted(){
            this.getMovie();
        },
        watch: {
            id(){
                this.getMovie();
            },
        },
        methods: {
            getMovie(){
                this.loading = true;
                let self = this;
                let url = 'https://api.themoviedb.org/3/movie/' + this.id;
                axios.get(url, {
                    params: {
                        api_key: process.env.VUE_APP_API_KEY,
                        language: 'fr',
                    }
                }).then(function (response) {
                    self.movie = response.data;
                    self.loading = false;
                }).catch(function (error) {
                    Vue.toasted.error(error);
                    self.loading = false;
                });
            },
        },
    }
</script>

<style
    scoped
    lang="scss">

    #backdrop {
        width: 100%;
        height: 700px;
        #title {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -100%);
        }
    }

    #backdrop::before {
        content: '';
        position: absolute;
        z-index: 0;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(rgba(28,33,41,0) 30%,rgba(28,33,41,.15) 45%,rgba(28,33,41,.9) 70%,#1c2129 80%),
        radial-gradient(ellipse at 80% 0,rgba(28,33,41,0),rgba(28,33,41,.8) 50%,#1c2129 70%);
    }

</style>