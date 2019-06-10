<template>
    <div>
        <div class="row p-3 mt-4">
            <b-card
                v-for="(movie,i) in movies"
                :key="'movie'+i"
                :title="movie.title"
                class="position-relative movie col-12 col-sm-6 col-md-4 mb-5 mx-5 px-0 pointer"
                :img-src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                :img-alt="movie.title"
                img-height="460"
                img-top
                tag="article"
                style="max-width: 20rem;"
                @click="selectMovie(movie)">
                <div
                    id="mark"
                    class="bg-warning position-absolute d-flex align-items-center justify-content-center">
                    {{ displayVote(movie) }}
                </div>
            </b-card>
        </div>
        <div class="d-flex justify-content-center mb-3">
            <v-pagination
                v-model="selectedPage"
                :page-count="movies.length"
                :classes="bootstrapPaginationClasses"
                :labels="paginationAnchorTexts" />
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Vue from 'vue';
    import vPagination from 'vue-plain-pagination'

    export default {
        name: "Search",
        components: {
            vPagination,
        },
        props: {
            search: {type: String},
        },
        data: () => ({
            movies: [],
            selectedPage: 1,
            bootstrapPaginationClasses: {
                ul: 'pagination',
                li: 'page-item',
                liActive: 'active',
                liDisable: 'disabled',
                button: 'page-link'
            },
            paginationAnchorTexts: {
                first: 'First',
                prev: 'Previous',
                next: 'Next',
                last: 'Last'
            },
        }),
        watch: {
            selectedPage(val){
                if(val > 0){
                    this.searchMovies();
                }
            },
            search(){
                this.searchMovies();
            }
        },
        mounted(){
            this.selectedPage = 1;
            this.searchMovies();
        },
        methods: {
            searchMovies(){
                let self = this;
                let url = 'https://api.themoviedb.org/3/search/movie';
                axios.get(url, {
                    params: {
                        api_key: process.env.VUE_APP_API_KEY,
                        query: this.search,
                        page: this.selectedPage,
                        language: 'fr',
                    }
                }).then(function (response) {
                    self.movies = response.data.results;
                }).catch(function (error) {
                    Vue.toasted.error(error);
                });
            },

            selectMovie(movie){
                this.selectedMovie = movie;
                this.$router.push({ name: 'movie.show', params: { id: this.selectedMovie.id }})
            },

            displayVote(movie){
                if(movie.vote_average === 0){
                    return 'X'
                }
                return movie.vote_average;
            }
        },
    }
</script>

<style scoped>

</style>