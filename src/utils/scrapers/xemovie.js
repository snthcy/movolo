import Config from "../../config.json";

async function scrape(tmdbId, type, episode, season) {
    const baseUrl = `https://cors.movolo.workers.dev/?url=https://xemovie.co`;
    let movieUrl = "/nosource.mp4",
        subtitles = [];

    const json = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${Config.tmdbKey}&language=en-US`).then(r => r.json());
    const searchPage = await fetch(`${baseUrl}/search?q=${type == "movie" ? encodeURIComponent(json.title) : encodeURIComponent(json.name)} ${type == "tv" ? `season ${season}` : ""}`).then(r => r.text());

    const searchDOM = new DOMParser().parseFromString(searchPage, "text/html");
    const videoUrls = [`https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-ep${episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-episode-${episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-ep-${episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-ep${parseInt(episode).toLocaleString("en-US", { minimumIntegerDigits: 2 })}` : ""}/watch`]

    for (const videoUrl of videoUrls) {
        try {
            const videoPage = await fetch(videoUrl).then(r => r.text());
            const videoDOM = new DOMParser().parseFromString(videoPage, "text/html");

            for (const script of videoDOM.scripts) {
                if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
                    let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
                    movieUrl = data.playlist[0].file;
                    subtitles = data.playlist[0].tracks;
                }
            }
        } catch {
            continue;
        }
    }

    if (movieUrl.endsWith(".m3u8")) movieUrl = "/nosource.mp4";
    if (!subtitles.length) subtitles = [];

    return { url: movieUrl, subtitles: subtitles };
}

export default { scrape };  