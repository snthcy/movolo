import Config from "../../config.json";

async function scrape(tmdbId, type, episode, season) {
    const baseUrl = `https://cors.movolo.workers.dev/?url=https://xemovie.co`;
    let movieUrl = "/nosource.mp4",
        subtitles = [];

    const json = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${Config.tmdbKey}&language=en-US`).then(r => r.json());
    const searchPage = await fetch(`${baseUrl}/search?q=${type == "movie" ? encodeURIComponent(json.title) : encodeURIComponent(json.name)} ${type == "tv" ? `season ${season}` : ""}`).then(r => r.text());

    const searchDOM = new DOMParser().parseFromString(searchPage, "text/html");
    const videoUrl1 = `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-ep${episode}` : ""}/watch`;
    const videoUrl2 = `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-episode-${episode}` : ""}/watch`;
    const videoUrl3 = `https://cors.movolo.workers.dev/?url=${type == "movie" ? [...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0] : [...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}${episode ? `-ep-${episode}` : ""}/watch`;

    const videoPage1 = await fetch(videoUrl1).then(r => r.text());
    const videoDOM1 = new DOMParser().parseFromString(videoPage1, "text/html");
    for (const script of videoDOM1.scripts) {
        if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
            let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
            movieUrl = data.playlist[0].file;
            subtitles = data.playlist[0].tracks;
        }
    }

    const videoPage2 = await fetch(videoUrl2).then(r => r.text());
    const videoDOM2 = new DOMParser().parseFromString(videoPage2, "text/html");
    for (const script of videoDOM2.scripts) {
        if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
            let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
            movieUrl = data.playlist[0].file;
            subtitles = data.playlist[0].tracks;
        }
    }

    const videoPage3 = await fetch(videoUrl3).then(r => r.text());
    const videoDOM3 = new DOMParser().parseFromString(videoPage3, "text/html");
    for (const script of videoDOM3.scripts) {
        if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
            let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
            movieUrl = data.playlist[0].file;
            subtitles = data.playlist[0].tracks;
        }
    }

    return { url: movieUrl, subtitles: subtitles };
}

export default { scrape };  