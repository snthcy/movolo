import type { SearchResult, Subtitles, ScrapeResult, ProviderInfo } from "../../Types";

const search = async (query: string) => {

    return;
}

const scrape = async (type: "movie" | "tv", slug: string) => {

    return;
}

const info: ProviderInfo = {
    name: "xemovie",
    supportedTypes: ["movie", "tv"],
    type: "scraper"
}

export default { search, scrape, info };