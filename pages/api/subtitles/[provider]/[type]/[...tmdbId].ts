import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

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

const getSubtitles = async (tmdb: { tmdbId: string, type: string, lang: string, season?: string, episode?: string }, provider: string) => {
    const { get } = await import(`../../../../../util/subtitles/${provider}`);

    // get subtitles
    const subtitles = await get({
        tmdbId: tmdb.tmdbId,
        type: tmdb.type,
        lang: tmdb.lang,
        season: tmdb.season,
        episode: tmdb.episode
    });
    return subtitles;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // #region - init
    let { provider, tmdbId, type } = req.query;

    let lang;
    let season;
    let episode;

    if (tmdbId[1]) lang = tmdbId[1].toString().toLowerCase() || null;
    if (tmdbId[2]) season = tmdbId[2].toString().toLowerCase() || null;
    if (tmdbId[3]) episode = tmdbId[3].toString().toLowerCase() || null;
    provider = provider.toString().toLowerCase();
    tmdbId = tmdbId[0].toLowerCase();
    type = type.toString().toLowerCase();

    const allowedProviders = [
        "gdriveplayer",
        "opensubtitles",
        "trailers",
        "xemovie"
    ]

    await runMiddleware(req, res, cors);
    // #endregion

    // #region - validation
    if (!allowedProviders.includes(provider)) {
        res.status(400).json({
            status: 400,
            error: "Invalid provider",
            data: null
        });
    };
    // #endregion

    res.json(await getSubtitles({ tmdbId, type, lang, season, episode }, provider));
}

export default handler;