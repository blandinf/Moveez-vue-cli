<template>
    <section>
        <div v-if="!selectedMovie">
            <b-form-group class="text-center">
                <b-form-radio-group
                    id="btn-radios-2"
                    v-model="selectedLanguage"
                    :options="languages"
                    buttons
                    button-variant="outline-warning"
                    size="md"
                    class="mx-auto mt-3" />
            </b-form-group>
            <b-card no-body>
                <b-tabs card>
                    <b-tab
                        v-for="(filter,i) in filters"
                        :key="'filter'+i"
                        :title="titleFromLanguage(filter)"
                        @click="selectedFilter = filter.value"
                        nav-class="pointer"
                        title-link-class="text-warning">
                        <div
                            v-if="!loading"
                            class="row d-flex justify-content-center mt-3">
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
                            <v-pagination
                                v-model="selectedPage"
                                :page-count="movies.length"
                                :classes="bootstrapPaginationClasses"
                                :labels="paginationAnchorTexts" />
                        </div>
                        <div
                            v-else
                            class="text-center">
                            <font-awesome-icon
                                size="lg"
                                icon="spinner"
                                spin />
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </section>
</template>

<script>

    import axios from 'axios';
    import Vue from 'vue';
    import vPagination from 'vue-plain-pagination'

    export default {
        name: "Index",
        components: { vPagination },
        data: () => ({
            filters: [
                { en_title: 'Now playing', fr_title: 'Au cinéma actuellement', value: 'now_playing'},
                { en_title: 'Upcoming', fr_title: 'À venir', value: 'upcoming'},
                { en_title: 'Popular', fr_title: 'Populaire', value: 'popular'},
                { en_title: 'Top Rated', fr_title: 'Les mieux notés', value: 'top_rated'},
            ],
            selectedFilter: 'popular',
            selectedPage: 1,
            selectedMovie: null,
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
            movies: [],
            loading: false,
            languages: [
                'FR',
                'EN'
            ],
            selectedLanguage: 'FR',
        }),
        watch: {
            selectedFilter(){
                this.getMovies();
            },
            selectedPage(val){
                if(val > 0){
                    this.getMovies();
                }
            },
            selectedLanguage(){
                this.getMovies();
            }
        },
        mounted() {
            this.selectedPage = 1;
            this.getMovies();
        },
        methods: {
            getMovies(){
                this.loading = true;
                let self = this;
                let url = 'https://api.themoviedb.org/3/movie/' + this.selectedFilter;
                axios.get(url, {
                    params: {
                        api_key: process.env.VUE_APP_API_KEY,
                        page: this.selectedPage,
                        language: this.selectedLanguage.toLowerCase(),
                    }
                }).then(function (response) {
                    self.movies = response.data.results;
                    self.loading = false;
                }).catch(function (error) {
                    Vue.toasted.error(error);
                    self.loading = false;
                });
            },

            titleFromLanguage(filter){
                if(this.selectedLanguage === 'EN'){
                    return filter.en_title;
                } else {
                    return filter.fr_title;
                }
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

<style lang="scss">

    .movie:hover {
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149);
    }

    #mark{
        top: 75%;
        left: 85%;
        height: 50px;
        width: 50px;
        font-weight: bold;
        border-radius: 50%;
        color: white;
    }
</style>