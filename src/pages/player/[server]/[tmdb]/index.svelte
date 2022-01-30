<script>
    import { params, goto } from '@roxi/routify';
    import { onMount } from 'svelte';
    let tmdbId = $params.tmdb,
        server = $params.server,
        videoUrl = "/loading.mp4",
        subtitles = [];

    onMount(async () => {
        const { scrape } = (await import(`../../../../utils/scrapers/${server}`)).default;
        let object = await scrape(tmdbId, "movie");
        videoUrl = object.url;
        subtitles = object.subtitles;
        subtitles.forEach(async (subtitle, index) => {
            const subtitleBlob = URL.createObjectURL(await fetch(`https://cors.movolo.workers.dev?url=${subtitle.file}`).then(res => res.blob()));
            subtitles[index].file = subtitleBlob;
        });
        document.querySelector("video").addEventListener("error", () => {
            videoUrl = "/later.mp4";
        });
    });
</script>

<span id="close" title="Go home" on:click={$goto('/')}><strong>❌</strong></span>
<video controls autoplay title="Video" src="{ videoUrl }" id="video">
    {#each subtitles as subtitle}
        <track kind={ subtitle.kind } src="{ subtitle.file }" label="{ subtitle.label }">
    {/each}
</video>