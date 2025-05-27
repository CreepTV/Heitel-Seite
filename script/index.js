// Beispielhafte Video-Daten
const videos = [
    {
        title: "Star Wars Fanfilm",
        thumb: "img/heitel.jpg",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        author: "Heitel",
        views: "1.234 Aufrufe",
        date: "vor 1 Tag"
    },
    {
        title: "Heitel erklärt JavaScript",
        thumb: "img/heitel.jpg",
        src: "https://www.w3schools.com/html/movie.mp4",
        author: "Heitel",
        views: "987 Aufrufe",
        date: "vor 2 Tagen"
    }
    // Weitere Videos können hier ergänzt werden
];

function renderVideos(list) {
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';
    list.forEach((video, idx) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <img class="video-thumb" src="${video.thumb}" alt="Thumbnail">
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-meta">${video.author} • ${video.views} • ${video.date}</div>
            </div>
        `;
        card.onclick = () => {
            history.pushState({video: idx}, '', '?v=' + idx);
            showVideoByIndex(idx);
        };
        grid.appendChild(card);
    });
}

function showVideoByIndex(idx) {
    const video = videos[idx];
    if (!video) return renderVideos(videos);
    const grid = document.getElementById('video-grid');
    grid.innerHTML = `
        <div style="max-width:900px;margin:32px auto;width:100%;background:#222;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.3);padding:24px;">
            <video src="${video.src}" controls autoplay style="width:100%;border-radius:12px;"></video>
            <h2 style="margin:18px 0 8px 0;">${video.title}</h2>
            <div style="color:#aaa;">${video.author} • ${video.views} • ${video.date}</div>
            <p style="margin-top:18px;">Beschreibung des Videos...</p>
            <button id="backBtn" style="margin-top:24px;padding:10px 24px;border-radius:24px;background:#1db954;color:#fff;border:none;font-size:1rem;cursor:pointer;">Zurück zur Übersicht</button>
        </div>
    `;
    document.getElementById('backBtn').onclick = () => {
        history.back();
    };
}

function getVideoIndexFromURL() {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('v');
    return v !== null ? parseInt(v, 10) : null;
}

document.addEventListener('DOMContentLoaded', () => {
    const idx = getVideoIndexFromURL();
    if (idx !== null && !isNaN(idx)) {
        showVideoByIndex(idx);
    } else {
        renderVideos(videos);
    }
    const searchInput = document.getElementById('search');
    let lastResults = [];
    searchInput.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        lastResults = videos.filter(v => v.title.toLowerCase().includes(q));
        renderVideos(lastResults);
    });
    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const q = searchInput.value.toLowerCase();
            lastResults = videos.filter(v => v.title.toLowerCase().includes(q));
            showSearchResultsList(lastResults);
        }
    });
});

function showSearchResultsList(results) {
    const grid = document.getElementById('video-grid');
    if (results.length === 0) {
        grid.innerHTML = '<div style="color:#fff;font-size:1.2rem;padding:32px;">Keine Videos gefunden.</div>';
        return;
    }
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '32px';
    list.style.margin = '0';
    list.style.maxWidth = '600px';
    list.style.background = '#232323';
    list.style.borderRadius = '16px';
    list.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    list.style.marginLeft = 'auto';
    list.style.marginRight = 'auto';
    results.forEach((video, idx) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '18px';
        li.style.padding = '18px 0';
        li.style.borderBottom = '1px solid #333';
        li.style.cursor = 'pointer';
        li.innerHTML = `<img src="${video.thumb}" alt="" style="width:80px;height:45px;object-fit:cover;border-radius:8px;"> <span style="font-size:1.1rem;color:#fff;">${video.title}</span>`;
        li.onclick = () => {
            history.pushState({video: idx}, '', '?v=' + videos.indexOf(video));
            showVideoByIndex(videos.indexOf(video));
        };
        list.appendChild(li);
    });
    grid.innerHTML = '';
    grid.appendChild(list);
}

window.addEventListener('popstate', () => {
    const idx = getVideoIndexFromURL();
    if (idx !== null && !isNaN(idx)) {
        showVideoByIndex(idx);
    } else {
        renderVideos(videos);
    }
});