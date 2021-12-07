<script>
    import { params } from '@roxi/routify';
    import Config from "../../../config.json";
    let overview = "",
    title = "";
    
    (async function () {
        if ($params.type == "movie") {
            let movie = await fetch(`https://api.themoviedb.org/3/movie/${$params.tmdb}?api_key=${Config.tmdbKey}&language=en-US`);
            let movieData = await movie.json();
            overview = movieData.overview;
            title = movieData.title;
        }
        if ($params.type == "tv") {
            let tv = await fetch(`https://api.themoviedb.org/3/tv/${$params.tmdb}?api_key=${Config.tmdbKey}&language=en-US`);
            let tvData = await tv.json();
            overview = tvData.overview;
            title = tvData.name;
        };
    })();
</script>

<h1>{title}</h1>
<h3>{overview}</h3>
<a href="/player/{$params.tmdb}">yeah</a>