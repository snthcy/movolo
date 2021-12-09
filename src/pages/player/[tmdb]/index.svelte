<script>
    import { params, goto } from '@roxi/routify';
    import Config from '../../../config.json';
    import APIs from '../../../apis.json';
    let tmdbId = $params.tmdb,
        imdbId,
        selected,
        url = "https://www.youtube.com/embed/gDFgzV7wq0g?controls=0&autoplay=1&modestbranding=1&loop=1&playlist=gDFgzV7wq0g";

    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${Config.tmdbKey}`).then(r=>r.json()).then(r=>{
        imdbId = r.imdb_id;
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
    {#each APIs.movie as api}
        <option value="{api.url.replace("imdbId", imdbId)}">{api.name}</option>
    {/each}
</select>
<iframe title="Movie iframe" allowfullscreen loading="eager" src="{ url }"></iframe>