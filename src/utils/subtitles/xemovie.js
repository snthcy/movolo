async function getSubtitles(query) {
    const baseUrl = `https://cors.movolo.workers.dev/?url=https://xemovie.co`;
    let subtitles = [];

    const searchPage = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}`).then(r => r.text());
    const searchDOM = new DOMParser().parseFromString(searchPage, "text/html");

    const videoUrl1 = `https://cors.movolo.workers.dev/?url=${[...searchDOM.getElementById(`"movie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}/watch`;
    const videoUrl2 = `https://cors.movolo.workers.dev/?url=${[...searchDOM.getElementById(`"serie"`).parentElement.parentElement.querySelectorAll("a")].filter(link => !link.className)[0]}/watch`;

    const videoPage1 = await fetch(videoUrl1).then(r => r.text());
    const videoDOM1 = new DOMParser().parseFromString(videoPage1, "text/html");
    for (const script of videoDOM1.scripts) {
        if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
            let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
            subtitles = data.playlist[0].tracks;
        }
    }

    const videoPage2 = await fetch(videoUrl2).then(r => r.text());
    const videoDOM2 = new DOMParser().parseFromString(videoPage2, "text/html");
    for (const script of videoDOM2.scripts) {
        if (script.textContent.match(/https:\/\/s[0-9]\.xemovie\.com/)) {
            let data = JSON.parse(JSON.stringify(eval(`(${script.textContent.replace("const data = ", "").split("};")[0]}})`)));
            subtitles = data.playlist[0].tracks;
        }
    }

    return subtitles;
}

export default { getSubtitles };