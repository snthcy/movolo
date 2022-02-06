import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import Config from "../../config.json";

const get = async (options) => {
    const imdbId = (await fetch(`https://api.themoviedb.org/3/${options.type}/${options.tmdbId}/external_ids?api_key=${Config.tmdbApiKey}&language=en-US`).then(r=>r.json()))["imdb_id"];

    const html = await fetch(`https://databasegdriveplayer.co/player.php?imdb=${imdbId}`).then(r=>r.text());
    console.log(imdbId)
    const DOM = new JSDOM(html).window.document;
    const data = JSON.parse(DOM.querySelector("#subtitlez").innerHTML);

    if (!data[0].file) return [];

    return data.map(({ label, file, kind }) => ({
        name: label,
        url: file,
        type: kind,
        hearingImpaired: false
    })).filter(({ name }) => name == new Intl.DisplayNames(["en"], { type: "language" }).of(options.lang));
};

const info = {
    name: "Google Drive Player",
    url: "https://databasegdriveplayer.co/",
    type: "subtitles"
};

export { get, info };