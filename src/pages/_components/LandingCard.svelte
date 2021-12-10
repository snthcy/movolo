<script>
    export let film;
    export let media_type;
    if (!film.media_type) film.media_type = media_type;
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
        {/if}
    <p>{ Math.round((film.vote_average/10).toFixed(2)*100) }% User Score</p>
    </a>
</main>

<style>
    main {
        display: inline-block;
        background-color: #171717;
        width: 250px;
        height: 420px;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
        border-radius: 5px;
        text-align: center;
        padding: 3px;
    }

    main img {
        display: inline-block;
        width: 170px;
        cursor: pointer;
        border-radius: 5px;
    }
    main h3 {
        text-decoration: none;
        font-size: 0.7em
    }
    main p {
        font-size: 0.9em;
        color: #fff;
    }
</style>
