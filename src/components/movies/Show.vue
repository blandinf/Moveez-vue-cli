<template>
    <section>
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
    export default {
        name: "Show",
        props: {
            movie: {},
        },
        mounted() {
            console.log(this.movie)
        }
    }
</script>

<style
    scoped
    lang="scss">

    #backdrop{
        width: 100%;
        height: 700px;
        #title{
            top: 50%;
            left: 50%;
            transform: translate(-50%, -100%);
        }
    }

</style>