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

const getSubtitles = async (tmdb: { tmdbId: string, type: string }, provider: string) => {
    const { get } = await import(`../../../../../util/subtitles/${provider}`);

    // get subtitles
    const subtitles = await get(tmdb.tmdbId, tmdb.type);
    return subtitles;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // #region - init
    let { provider, tmdbId, type } = req.query;

    provider = provider.toString().toLowerCase();
    tmdbId = tmdbId.toString().toLowerCase();
    type = type.toString().toLowerCase();

    const allowedProviders = [
        "gdp",
        "os",
        "trailers",
        "xem"
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

    res.json(await getSubtitles({ tmdbId, type }, provider));
}

export default handler;