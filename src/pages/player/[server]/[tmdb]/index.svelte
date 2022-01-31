<script>
    import { params, goto } from '@roxi/routify';
    import { onMount } from 'svelte';
    let tmdbId = $params.tmdb,
        server = $params.server,
        videoUrl = "/loading.mp4",
        subtitles = [];

    function convertSrtToVtt(srt) {
        srt.replace(/(\d+:\d+:\d+)+,(\d+)/g, '$1.$2');
        srt = "WEBVTT\r\n\r\n" + srt
        let blob = new Blob([srt], {type: 'text/vtt'});
        let file = window.URL.createObjectURL(blob);

        return file;
    }

    onMount(async () => {
        const { scrape } = (await import(`../../../../utils/scrapers/${server}.js`)).default;
        const { osGetSubtitles } = (await import(`../../../../utils/subtitles/openSubtitles.js`)).default;
        const { xemGetSubtitles } = (await import(`../../../../utils/subtitles/xemovie.js`)).default;
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
<!-- svelte-ignore a11y-media-has-caption -->
<video controls autoplay title="Video" src="{ videoUrl }" id="video">
    {#each subtitles as subtitle}
        <track kind={ subtitle.kind } src="{ subtitle.file }" label="{ subtitle.label }">
    {/each}
</video>