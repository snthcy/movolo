import Config from "../../config.json";

async function getSubtitles(options) {
    const baseUrl = `https://cors.movolo.workers.dev/?url=https://xemovie.co`,
        type = options.type;
    let subtitles = [];

    const json = await fetch(`https://api.themoviedb.org/3/${type}/${options.tmdbId}?api_key=${Config.tmdbKey}&language=en-US`).then(r => r.json());
    const name = type == "movie" ? json.title : json.name;

    const searchPage = await fetch(`${baseUrl}/search?q=${encodeURIComponent(name)} ${type == "tv" ? `season ${options.season}` : ""}`).then(r => r.text());
    const searchDOM = new DOMParser().parseFromString(searchPage, "text/html");

    const videoUrls = [`https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${options.episode ? `-ep${options.episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${options.episode ? `-episode-${options.episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${options.episode ? `-ep-${options.episode}` : ""}/watch`, `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${options.episode ? `-ep${parseInt(options.episode).toLocaleString("en-US", { minimumIntegerDigits: 2 })}` : ""}/watch`]

    for (const videoUrl of videoUrls) {
        try {
            const videoPage = await fetch(videoUrl).then(r => r.text());
            const videoDOM = new DOMParser().parseFromString(videoPage, "text/html");

            for (const script of videoDOM.scripts) {
                if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
                    let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
                    subtitles = data.playlist[0].tracks;
                }
            }
        } catch {
            continue;
        }
    }

    return subtitles;
}

export default { getSubtitles };