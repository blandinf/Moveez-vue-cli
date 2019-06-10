<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="warning">
            <b-navbar-brand href="/">Movies</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input
                            id="search-input"
                            size="sm"
                            class="mr-sm-2"
                            v-model="query"
                            placeholder="Search..."
                            @focus="show = true" />
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <search
            v-if="!_isEmpty(query)"
            @closeModal="closeModal"
            :movies="movies"
            :show="show"
            :search="query" />
    </div>
</template>

<script>
    import Search from "../modules/Search";
    import Vue from 'vue';
    import axios from 'axios';
    import _isEmpty from 'lodash/isEmpty';
    import _debounce from 'lodash/debounce';

    export default {
        name: "Navbar",
        components: {Search},
        data: () => ({
            query: null,
            movies: [],
            show: true,
        }),
        computed: {
            _isEmpty() {
                return _isEmpty;
            },
        },
        watch: {
            query: _debounce(function () {
                if(this.query){
                    this.show = true;
                    this.searchMovies();
                }
            }, 300),
        },
        methods: {
            searchMovies(){
                let self = this;
                let url = 'https://api.themoviedb.org/3/search/movie';
                axios.get(url, {
                    params: {
                        api_key: process.env.VUE_APP_API_KEY,
                        query: this.query,
                        language: 'fr',
                    }
                }).then(function (response) {
                    self.movies = response.data.results;
                }).catch(function (error) {
                    Vue.toasted.error(error);
                });
            },

            closeModal(){
                this.show = !this.show;
            }
        },
    }
</script>

<style
    scoped
    lang="scss">

    #search-input {
        background: #fff url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1MC4zMTMgMjUwLjMxMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUwLjMxMyAyNTAuMzEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnIGlkPSJTZWFyY2giPgoJPHBhdGggc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkOyIgZD0iTTI0NC4xODYsMjE0LjYwNGwtNTQuMzc5LTU0LjM3OGMtMC4yODktMC4yODktMC42MjgtMC40OTEtMC45My0wLjc2ICAgYzEwLjctMTYuMjMxLDE2Ljk0NS0zNS42NiwxNi45NDUtNTYuNTU0QzIwNS44MjIsNDYuMDc1LDE1OS43NDcsMCwxMDIuOTExLDBTMCw0Ni4wNzUsMCwxMDIuOTExICAgYzAsNTYuODM1LDQ2LjA3NCwxMDIuOTExLDEwMi45MSwxMDIuOTExYzIwLjg5NSwwLDQwLjMyMy02LjI0NSw1Ni41NTQtMTYuOTQ1YzAuMjY5LDAuMzAxLDAuNDcsMC42NCwwLjc1OSwwLjkyOWw1NC4zOCw1NC4zOCAgIGM4LjE2OSw4LjE2OCwyMS40MTMsOC4xNjgsMjkuNTgzLDBDMjUyLjM1NCwyMzYuMDE3LDI1Mi4zNTQsMjIyLjc3MywyNDQuMTg2LDIxNC42MDR6IE0xMDIuOTExLDE3MC4xNDYgICBjLTM3LjEzNCwwLTY3LjIzNi0zMC4xMDItNjcuMjM2LTY3LjIzNWMwLTM3LjEzNCwzMC4xMDMtNjcuMjM2LDY3LjIzNi02Ny4yMzZjMzcuMTMyLDAsNjcuMjM1LDMwLjEwMyw2Ny4yMzUsNjcuMjM2ICAgQzE3MC4xNDYsMTQwLjA0NCwxNDAuMDQzLDE3MC4xNDYsMTAyLjkxMSwxNzAuMTQ2eiIgZmlsbD0iIzg3OThhYSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) no-repeat 10px;
        background-size: 15px;
        color: #525f7f;
        padding-left: 32px;
        padding-right: 32px;
        transition: box-shadow .2s ease-in-out;
    }

</style>