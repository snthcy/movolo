<script>
    export let film;
</script>

<main>
    <a href="/info/{ film.media_type }/{ film.id }">
        <h3>{ film.media_type == "movie" ? film.title : film.name }</h3>
        <p>{ film.overview.length == 0 ? "No overview available." : film.overview.substr(0, 100) + "..."}</p>
        {#if film.poster_path}
            <img
                src="https://image.tmdb.org/t/p/w500/{film.poster_path}"
                alt="Film Poster"
            />
        {:else}
            <img
                src="https://dummyimage.com/500x750/000/ffffff&text=++No+Poster+Available"
                alt="Film Poster"
            />
        {/if}</a
    >
    <p>{ Math.round((film.vote_average/10).toFixed(2)*100) }% User Score</p>
</main>

<style>
    main {
        display: inline-block;
        background-color: #171717;
        width: 290px;
        height: 458px;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
        border-radius: 5px;
        text-align: center;
        padding: 5px;
    }

    main img {
        display: inline-block;
        width: 170px;
        cursor: pointer;
        border-radius: 5px;
    }
    main h3 {
        text-decoration: none;
        font-size: 1em
    }
</style>
