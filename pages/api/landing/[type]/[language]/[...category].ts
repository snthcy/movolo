import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import fetch from "node-fetch";
import Config from "../../../../../config.json";

const cors = Cors({
    methods: ["GET", "HEAD"],
});

const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
};

const formatResults = (json) => {
    return json.results.map(r => {
        return {
            id: r.id,
            title: r.title ?? r.name,
            poster: r.poster_path ? `https://image.tmdb.org/t/p/w500${r.poster_path}` : null,
            backdrop: r.backdrop_path ? `https://image.tmdb.org/t/p/w500${r.backdrop_path}` : null,
            overview: r.overview,
            rating: r.vote_average,
            release: r.release_date,
            genres: r.genre_ids.map(g => genres.filter(g2 => g2.id == g)[0].name)
        }
    });
};

const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"},{"id":10759,"name":"Action & Adventure"},{"id":10762,"name":"Kids"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"}];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // #region - init
    let { type, category, language } = req.query;
    let page = `page=${category[1] || 1}`;
    type = type.toString();
    category = category.toString().toLowerCase();
    language = language.toString().toLowerCase();

    const allowedEndpoints = ["popular", "top", "trending"];
    const allowedTypes = ["movie", "tv"];
    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

    await runMiddleware(req, res, cors);

    let json = {
        status: 200,
        error: null,
        data: {}
    };
    let resp;
    // #endregion

    // #region - validate
    if (!allowedEndpoints.includes(category)) {
        return res.status(400).json({
            status: 400,
            error: "Invalid category",
            data: {}
        });
    }
    if (!allowedTypes.includes(type.toLowerCase())) {
        return res.status(400).json({
            status: 400,
            error: "Invalid category",
            data: {}
        });
    }
    try {
        if (language == languageNames.of(language)) {
            return res.status(400).json({
                status: 400,
                error: "Invalid language",
                data: {}
            });
        }
    } catch {
        return res.status(400).json({
            status: 400,
            error: "Invalid language",
            data: {}
        });
    }

    if (category == "top") category = "top_rated";
    // #endregion

    // #region - fetch    
    switch (category) {
        case "trending":
            resp = await fetch(`https://api.themoviedb.org/3/${category}/${type}/day?api_key=${Config.tmdbApiKey}&language=${language}&${page}`).then(r => r.json());
            json.data = formatResults(resp);
            break;
        default:
            resp = await fetch(`https://api.themoviedb.org/3/${type}/${category}?api_key=${Config.tmdbApiKey}&language=${language}&${page}`).then(r => r.json());
            json.data = formatResults(resp);
            break;
    };
    // #endregion

    res.json(json);
};

export default handler;