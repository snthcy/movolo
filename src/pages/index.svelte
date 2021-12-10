<script>
    import { metatags } from '@roxi/routify';
    import LandingView from './_components/LandingView.svelte';
    import Config from "../config.json";
    
    metatags.title = 'Movolo'
    metatags.description = 'Movolo is a Movie & TV search engine.';

    let trendingMovies = [],
        popularMovies = [],
        trendingTv = [],
        popularTv = [];

    (async function(){
        let trendMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${Config.tmdbKey}`);
        trendingMovies = await trendMovies.json();
        trendingMovies = trendingMovies.results;
        let popMovies = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${Config.tmdbKey}`);
        popularMovies = await popMovies.json();
        popularMovies = popularMovies.results;
        popularMovies.media_type = 'movie';
        let trendTv = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${Config.tmdbKey}`);
        trendingTv = await trendTv.json();
        trendingTv = trendingTv.results;
        let popTv = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${Config.tmdbKey}`);
        popularTv = await popTv.json();
        popularTv = popularTv.results;
        popularTv.media_type = 'tv';
    })(); 
    
</script>

<div class="movies">
    <h1>Trending Movies</h1>
    <LandingView results={trendingMovies}/>
</div>
<br>
<hr>

<div class="movies">
    <h1>Popular Movies</h1>
    <LandingView results={popularMovies} media_type={popularMovies.media_type}/>
</div>

<br>
<hr>

<div class="movies">
    <h1>Trending TV</h1>
    <LandingView results={trendingTv}/>
</div>

<br>
<hr>

<div class="movies">
    <h1>Popular TV</h1>
    <LandingView results={popularTv} media_type={popularTv.media_type}/>
</div>

<br>
<hr>

<style>
    .movies {
        text-align: center;
    }
</style>