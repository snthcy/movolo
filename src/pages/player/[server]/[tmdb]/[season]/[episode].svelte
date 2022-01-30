<script>
    import { params, goto } from '@roxi/routify';
    import { onMount } from "svelte";
    let tmdbId = $params.tmdb,
        season = $params.season,
        episode = $params.episode,
        server = $params.server,
        videoUrl = "/loading.mp4",
        subtitles = [];

    onMount(async () => {
        const { scrape } = (await import(`../../../../../utils/scrapers/${server}`)).default;
        // const getSubtitles = (await import(`../../../../scrape/${server}`)).getSubtitles;
        videoUrl = await scrape(tmdbId, "tv", season, episode);
        // subtitles = await getSubtitles(tmdbId);
        document.querySelector("video").addEventListener("error", () => {
            videoUrl = "/later.mp4";
        });
    });
</script>

<span id="close" title="Go home" on:click={$goto('/')}><strong>❌</strong></span>
<video controls autoplay title="Video" src="{ videoUrl }"></video>