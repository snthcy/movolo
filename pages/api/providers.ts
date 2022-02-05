import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import path from "path";
import { readdirSync } from "fs";

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

const getScraperProviders = () => {
    const providers = [];
    const dir = path.resolve("util", "scrapers")
    const files = readdirSync(dir).filter(f => f.endsWith(".js"));
    files.forEach(async (f) => {
        const { info } = (await import(`${dir}/${f}`)).default;
        providers.push(info);
    });

    console.log(providers)

    return providers;
}

const getSubtitleProviders = () => {
    const providers = [];
    const dir = path.resolve("util", "subtitles")
    const files = readdirSync(dir).filter(f => f.endsWith(".js"));
    files.forEach(async (f) => {
        const { info } = (await import(`${dir}/${f}`)).default;
        providers.push(info);
    });

    return providers;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const scrapers = getScraperProviders();
    const subtitles = getSubtitleProviders();
    
    const json = {
        status: 200,
        error: null,
        data: {
            scrapers,
            subtitles
        }
    };

    res.json(json);
}

export default handler;