<script>
    import View from "./_components/View.svelte";
    import Config from "../config.json";
    let results = [],
        query = "";

    const search = async () => {
        if (!query.length) return;
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${Config.tmdbKey}&language=en-US&query=${query}&page=1&include_adult=false`).then(r=>r.json()).then(json=>{
            results = json.results.filter(r => r.media_type != "person")
            console.log(json)
        });
    };
</script>

<form on:submit|preventDefault={search}>
    <input type="text" placeholder="search" bind:value={query} />
    <button>Submit</button>
</form>

<View {results}></View>
