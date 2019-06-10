<template>
    <div
        v-show="show"
        id="search"
        class="position-absolute p-4">
        <div class="d-flex justify-content-between mb-4">
            <h4 v-if="movies">{{ displayResults }}</h4>
            <font-awesome-icon
                icon="times"
                class="pointer"
                @click="$emit('closeModal')" />
        </div>
        <div class="row d-flex justify-content-center">
            <b-card
                v-for="(movie,i) in firstMovies"
                :key="'movie'+i"
                :title="movie.title"
                class="position-relative movie col-3 col-md-4 mx-4 mb-5 px-0 pointer border-0"
                :img-src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                :img-alt="movie.title"
                img-height="260"
                tag="article"
                style="max-width: 260px"
                @click="selectMovie(movie)">
                <div
                    id="mark"
                    class="bg-warning position-absolute d-flex align-items-center justify-content-center">
                    {{ displayVote(movie) }}
                </div>
            </b-card>
        </div>
        <div
            class="mb-4 w-100 text-center"
            @click="$emit('closeModal')">
            <router-link
                id="more-results"
                class="mx-auto"
                :to="{ name: 'search', params: { search: search }}">
                <font-awesome-icon icon="eye" />
                <span class="ml-2">Voir tous les résultats</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        props: {
            movies: {type: Array},
            show: {type: Boolean},
            search: {type: String},
        },
        data: () => ({
            selectedMovie: null,
        }),
        computed: {
            displayResults(){
                if(this.movies.length === 1){
                    return this.movies.length + ' résultat trouvé';
                } else if(this.movies.length > 1 && this.movies.length < 20){
                    return this.movies.length + ' résultats trouvés';
                } else if(this.movies.length > 19){
                    return this.movies.length + '+ résultats trouvés';
                } else {
                    return 'Aucun résultat trouvé';
                }
            },
            firstMovies(){
                if(this.movies.length > 3){
                    return this.movies.slice(0,3)
                }
                return this.movies;
            },
        },
        methods: {
            selectMovie(movie){
                this.selectedMovie = movie;
                this.$router.push({ name: 'movie.show', params: { id: this.selectedMovie.id }});
                this.$emit('closeModal');
            },

            displayVote(movie){
                if(movie.vote_average === 0){
                    return 'X'
                }
                return movie.vote_average;
            },
        },
    }
</script>

<style
    scoped
    lang="scss">

    #search {
        z-index: 5;
        width: 60%;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149);
        border-radius: 10px;
        right: 0;
        background-color: #f2f3f5;
    }

    #search:hover {
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25)
    }

    .movie:hover {
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149);
    }

    #mark{
        top: 67%;
        left: 85%;
        height: 50px;
        width: 50px;
        font-weight: bold;
        border-radius: 50%;
        color: white;
    }

    #more-results {
        color: black;
        background-color: white;
        padding: 12px 10px;
        border-radius: 15px;
        text-decoration: none;
    }

    #more-results:hover {
        box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149);
    }

</style>