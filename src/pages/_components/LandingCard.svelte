<script>
    export let film;
    export let media_type;
    if (!film.media_type) film.media_type = media_type;
</script>

<main>
    <a href="/info/{ film.media_type }/{ film.id }">
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
        <h3>{ film.media_type == "movie" ? film.title : film.name }</h3>
    </a>
</main>

<style>
    main {
        display: inline-block;
        background-color: #171717;
        width: 250px;
        height: 315px;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
        border-radius: 5px;
        text-align: center;
        padding: 3px;
        padding-top: 10px;
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
