import fetch from "node-fetch";

const get = async (tmdb, type) => {
    const imdbId = (await fetch(`https://api.themoviedb.org/3/${type}/${tmdb}/external_ids?api_key=${Config.tmdbApiKey}&language=en-US`).then(r=>r.json()))["imdb_id"];

    const json = await fetch(`https://rest.opensubtitles.org/search/`).then(r=>r.json());

    return;
};

const info = {
    name: "OpenSubtitles",
    url: "https://www.opensubtitles.org/",
    type: "subtitles"
};

export { get, info };