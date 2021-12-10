<script>
    import { params, goto } from '@roxi/routify';
    import Config from '../../../../config.json'
    import APIs from '../../../../apis.json';
    let tmdbId = $params.tmdb,
        imdbId = "",
        season = $params.season,
        episode = $params.episode,
        selected,
        url = "https://www.youtube.com/embed/gDFgzV7wq0g?controls=0&autoplay=1&modestbranding=1&loop=1&playlist=gDFgzV7wq0g";

    fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${Config.tmdbKey}&append_to_response=external_ids`).then(r=>r.json()).then(r=>{
        imdbId = r.external_ids.imdb_id;
    });
    
    const check = () => {
        url = selected;
        document.querySelector("#select")?.remove();
        if (!document.querySelector("#server").classList.contains("color")) document.querySelector("#server").classList.add("color");
        if (selected && new URL(selected).hostname === "getsuperembed.link") {
            fetch(`https://api.allorigins.win/get?url=${selected}`).then(r=>r.json()).then(r=>{
                url = r.contents;
            });
        }
        if (selected && new URL(selected).hostname === "googlvideo.com") {
            document.querySelector("#close").classList.add("one23movie");
            document.querySelector("#server").classList.add("one23movie-server");
        } else {
            document.querySelector("#close").classList?.remove("one23movie");
            document.querySelector("#server").classList?.remove("one23movie-server");
        }
    }

    const show = () => document.querySelector("#server").classList.remove("hide");
    const hide = () => document.querySelector("#server").classList.add("hide");
    const checkAgent = () => {
        if (!navigator.userAgent.includes("Firefox")) {
            setTimeout(()=>document.querySelector(".warning-container").classList.add("hide-warning"), 1500)
        } else {
            document.querySelector(".warning-container").classList.add("hide-warning")
        }
    }
</script>

<div class="warning-container" on:mouseover={()=>checkAgent()} on:focus={()=>checkAgent()}><h1 id="warning">Movolo is best used in Firefox, with uBlock Origin installed. <br>We recommend to use it for no popups & ads. Thanks!</h1></div>
<span id="close" title="Go home" on:click={$goto('/')}><strong>❌</strong></span>
<select bind:value={selected} id="server" on:mouseover={()=>show()} on:focus={()=>show()} on:blur={()=>hide()} on:mouseout={()=>hide()} on:change={() => check()}>
    <option id="select">• Select Server •</option>
    {#each APIs.tv as api}
        <option value="{api.url.replace("imdbId", imdbId).replace("tmdbId", tmdbId).replace("s3as", season).replace("3pi", episode)}">{api.name}</option>
    {/each}
</select>
<iframe title="Movie iframe" allowfullscreen loading="eager" src="{ url }"></iframe>