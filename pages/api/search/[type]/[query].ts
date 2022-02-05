import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import fetch from "node-fetch";
import Config from "../../../../config.json";

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
            genres: r.genre_ids.map(g => genres.filter(g2 => g2.id == g)[0])
        }
    });
};

const genres = [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"},{"id":10759,"name":"Action & Adventure"},{"id":10762,"name":"Kids"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"}];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // #region - init
    let { type, query } = req.query;
    type = type.toString();
    query = query.toString();

    await runMiddleware(req, res, cors);

    let json = {
        status: 200,
        error: null,
        data: {}
    };
    let resp;
    // #endregion

    // #region - validate
    
    // #endregion

    // #region - fetch    
    
    // #endregion

    res.json(json);
};

export default handler;