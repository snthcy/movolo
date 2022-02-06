import fetch from "node-fetch";
import jsdom from "jsdom";
import Config from "../../config.json";

const get = async (tmdb, type) => {
    const imdbId = (await fetch(`https://api.themoviedb.org/3/${type}/${tmdb}/external_ids?api_key=${Config.tmdbApiKey}&language=en-US`).then(r=>r.json()))["imdb_id"];

    const html = await fetch(`https://databasegdriveplayer.co/player.php?imdb=${imdbId}`).then(r=>r.text());
    const DOM = new jsdom.JSDOM(html).window.document;
    const data = JSON.parse(DOM.querySelector("#subtitlez").innerHTML);

    return data.map(({ label, file, kind }) => ({
        name: label,
        url: file,
        type: kind,
        hearingImpaired: false
    }));
};

const info = {
    name: "Google Drive Player",
    url: "https://databasegdriveplayer.co/",
    type: "subtitles"
};

export { get, info };