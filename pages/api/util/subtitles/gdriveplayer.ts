import type { Subtitles, Subtitle, ProviderInfo } from "../../Types";

const search = async (query: string) => {
    
    return;
};

const info: ProviderInfo = {
    name: "GDrivePlayer",
    supportedTypes: ["movie", "tv"],
    type: "subtitles"
}

export default { search, info };