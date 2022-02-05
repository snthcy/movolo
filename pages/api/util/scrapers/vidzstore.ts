import type { SearchResult, ScrapeResult, ProviderInfo } from "../../Types";

const search = async (query: string) => {

    return;
}

const scrape = async (type: "movie" | "tv", slug: string) => {

    return;
}

const info: ProviderInfo = {
    name: "TheFlix",
    supportedTypes: ["movie", "tv"],
    type: "scraper"
}

export default { search, scrape, info };