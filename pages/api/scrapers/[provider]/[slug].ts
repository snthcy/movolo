import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import fetch from "node-fetch";
import Config from "../../../../../config.json";
import { ScrapeResult } from "../../../../../Types";

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

const scrape = async (slug: string, provider: string): Promise<ScrapeResult> => {
    const parser = new DOMParser();

    switch (provider) {
        case "theflix":
            return;
        case "vidzstore":
            return;
        case "xemovie":
            return;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // #region - init
    let { provider, slug } = req.query;

    provider = provider.toString().toLowerCase();
    slug = decodeURIComponent(slug.toString());

    const allowedProviders = [
        "theflix",
        "vidzstore",
        "xemovie",
    ];

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

    scrape(slug, provider);
}

export default handler;