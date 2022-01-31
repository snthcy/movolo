async function getSubtitles(options) {
    function uniqByKeepFirst(a, key) {
        let seen = new Set();
        return a.filter(item => {
            let k = key(item);
            return seen.has(k) ? false : seen.add(k);
        });
    }

    function parseJSON(json) {
        const formattedSubtitles = [];
        const subtitles = uniqByKeepFirst(json.filter(sub => sub.SubFileName.toLowerCase().endsWith("srt")), sub => sub.ISO639);
        for (const subtitle of subtitles) {
            if (subtitle.InfoFormat) {
                formattedSubtitles.push({
                    url: `${new URL(subtitle.SubDownloadLink).origin}/${new URL(subtitle.SubDownloadLink).pathname.split(".").shift()}`,
                    label: new Intl.DisplayNames(["en"], { "type": "language" }).of(subtitle.ISO639.replace("pb", "pt")),
                    kind: "subtitles"
                });
            }
        }
        return formattedSubtitles
    }

    if (options.imdbId) {
        const json = await fetch(`https://rest.opensubtitles.org/search/imdbid-${options.imdbId.replace("tt", "")}`, {
            headers: {
                "X-User-Agent": "Movolo"
            }
        }).then(r => r.json());

        return parseJSON(json);
    }
    if (options.query) {
        const json = await fetch(`https://rest.opensubtitles.org/search/query-${encodeURIComponent(options.query).replace(/ /g, "+")}`, {
            headers: {
                "X-User-Agent": "Movolo"
            }
        }).then(r => r.json());

        return parseJSON(json);
    }
}

export default { getSubtitles };