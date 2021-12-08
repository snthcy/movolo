<script>
    import { params } from '@roxi/routify';
    import Config from "../../../config.json";
    let info = {
        "title": "Placeholder",
        "overview": "Placeholder",
    };
    
    (async function () {
        if ($params.type == "movie") {
            let movie = await fetch(`https://api.themoviedb.org/3/movie/${$params.tmdb}?api_key=${Config.tmdbKey}&language=en-US`);
            let movieData = await movie.json();
            info = movieData;
        }
        if ($params.type == "tv") {
            let tv = await fetch(`https://api.themoviedb.org/3/tv/${$params.tmdb}?api_key=${Config.tmdbKey}&language=en-US`);
            let tvData = await tv.json();
            info = tvData;
        };
    })();
</script>

<main>
    <span onclick="history.back();"><strong>X</strong></span>
    {#if info?.backdrop_path}
        <img src="https://image.tmdb.org/t/p/original{ info?.backdrop_path }" alt="Backdrop"/>
    {:else}
        <img src="https://dummyimage.com/1920x1080/000/ffffff&text=++No+Backdrop+Available" alt="Backdrop"/>
    {/if}
    <h1>{info?.title ? info?.title : info?.name}</h1>
    <p>{info?.overview ? info.overview : "No overview available."}</p>
    <p>{info?.title ? info?.title : info?.name} has a { (info.vote_average/10).toFixed(2)*100 }% score, rated by users.</p>
    <br><br>
    {#if info.status != "Planned"}
        <a href="/player/{$params.tmdb}">STREAM</a>
    {:else}
        <a class="disable" href="javascript:void(0);">UNABLE TO STREAM</a>
    {/if}
</main>

<style>
    main {
        display: inline-block;
        background-color: #171717;
        width: 99%;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
        border-radius: 5px;
        text-align: center;
        padding: 5px;
    }
    main img {
        float: left;
        width: 60%;
        border-radius: 5px;
    }
    main p {
        padding-left: 61%;
        padding-right: 1%;
    }
    main span {
        cursor: pointer;
    }
    main a {
        background: #3498db;
        background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
        background-image: -moz-linear-gradient(top, #3498db, #2980b9);
        background-image: -ms-linear-gradient(top, #3498db, #2980b9);
        background-image: -o-linear-gradient(top, #3498db, #2980b9);
        background-image: linear-gradient(to bottom, #3498db, #2980b9);
        -webkit-border-radius: 28;
        -moz-border-radius: 28;
        border-radius: 28px;
        font-family: Arial;
        color: #ffffff;
        font-size: 30px;
        background: #81ff5e;
        padding: 10px 20px 10px 20px;
        text-decoration: none;
        -webkit-text-stroke-width: 0.5px;
        -webkit-text-stroke-color: black;
    }

    main a:hover {
        background: #c1ffb0;
        text-decoration: none;
    }

    .disable {
        background: #3498db;
        background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
        background-image: -moz-linear-gradient(top, #3498db, #2980b9);
        background-image: -ms-linear-gradient(top, #3498db, #2980b9);
        background-image: -o-linear-gradient(top, #3498db, #2980b9);
        background-image: linear-gradient(to bottom, #3498db, #2980b9);
        -webkit-border-radius: 28;
        -moz-border-radius: 28;
        border-radius: 28px;
        font-family: Arial;
        color: #ffffff;
        font-size: 20px;
        background: #8c8c8c;
        padding: 10px 20px 10px 20px;
        text-decoration: none;
    }

    .disable:hover {
        cursor: default;
        background: #8c8c8c;
        text-decoration: none;
    }

    main span {
        position: absolute;
        right: 1.5%;
        color: red;
    }
</style>