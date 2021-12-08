<script>
    import { params, goto } from '@roxi/routify';
    import { onMount } from 'svelte';
    import View from "../_components/View.svelte";
    import Config from "../../config.json";
    let results = [],
        query = $params.query.replace(/\%20/g, " "),
        searchBox;

    const search = async () => {
        if (!query.length) return;
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Config.tmdbKey}&language=en-US&query=${query}&page=1&include_adult=false`).then(r=>r.json()).then(json=>{
            results = json.results.filter(r => r.media_type != "person")
            $goto(`/search/${query}`);
        });
    };

    search(query);
    onMount(() => searchBox.focus());
</script>

<input type="text" bind:this={searchBox} placeholder="search" bind:value={query} on:input={() => {search(query);}} />

<View {results}></View>
