export interface Subtitles {
    subtitles: Subtitle[];
    provider: string;
}

export interface Subtitle {
    label: string;
    url: string;
    kind: "captions" | "subtitles";
    hearingImpaired: boolean;
}

export interface ScrapeResult {
    url: string;
    subtitles?: Subtitles[];
    scraper: string; 
}

export interface SearchResult {
    title: string;
    year: number;
    slug: string;
    subtitles: boolean;
}

export interface SearchResults {
    results: SearchResult[];
}

export interface FormattedResult {
    id:       number;
    title:    string;
    poster:   string;
    backdrop: string;
    overview: string;
    rating:   number;
    release:  string;
    genres:   any[];
}

export interface ProviderInfo {
    name: string;
    supportedTypes: string[];
    type: "subtitles" | "scraper";
}