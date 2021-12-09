<script>
    import { params } from '@roxi/routify';
    import Config from '../../../../config.json';
    import APIs from '../../../../apis.json';
    let tmdbId = $params.tmdb,
        imdbId,
        season = $params.season,
        episode = $params.episode,
        selected,
        url = "https://www.youtube.com/embed/IkdmOVejUlI?controls=0&autoplay=1&modestbranding=1";

    fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${Config.tmdbKey}`).then(r=>r.json()).then(r=>{
        imdbId = r.imdb_id;
    });
    
    const superEmbedCheck = () => {
        url = selected;
        document.querySelector("#select").remove();
        if (!document.querySelector("#server").classList.contains("color")) document.querySelector("#server").classList.add("color");
        if (selected && new URL(selected).hostname === "getsuperembed.link") {
            fetch(`https://api.allorigins.win/get?url=${selected}`).then(r=>r.json()).then(r=>{
                selected = r.contents;
            });
        }
    }
</script>

<select bind:value={selected} id="server" on:change={() => superEmbedCheck()}>
    <option id="select" value="https://www.youtube.com/embed/IkdmOVejUlI?controls=0&autoplay=1&modestbranding=1">• Select Server •</option>
    {#each APIs.tv as api}
        <option value="{api.url.replace("imdbId", imdbId).replace("tmdbId", tmdbId).replace("seas", season).replace("epi", episode)}">{api.name}</option>
    {/each}
</select>
<iframe title="Movie iframe" allowfullscreen loading="eager" src="{ url }"></iframe>