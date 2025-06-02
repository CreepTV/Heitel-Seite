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
            <div class="video-player-container" style="position:relative;width:100%;max-width:100%;">
                <video id="customVideo" src="${video.src}" style="width:100%;border-radius:12px;background:#000;display:block;" preload="metadata"></video>
                <div id="customControls" class="video-controls-overlay">
                    <div class="seekbar-row">
                        <input id="seekBar" type="range" min="0" max="100" value="0" step="0.01">
                    </div>
                    <div class="controls-row">
                        <div style="display:flex;align-items:center;gap:10px;flex:1 1 0;">
                            <button id="playPauseBtn" class="control-btn" title="Play/Pause">▶️</button>
                            <button id="nextVideoBtn" class="control-btn" title="Nächstes Video">⏭️</button>
                            <span id="currentTime" style="min-width:48px;font-variant-numeric:tabular-nums;">0:00</span>
                            <span style="color:#ffff;font-size:1.2em;padding:0 0;">/</span>
                            <span id="duration" style="min-width:48px;font-variant-numeric:tabular-nums;">0:00</span>
                            <button id="muteBtn" class="control-btn" title="Mute/Unmute">🔊</button>
                            <input id="volumeBar" type="range" min="0" max="1" step="0.01" value="1" style="width:80px;">
                        </div>
                        <div style="display:flex;align-items:center;gap:0;margin-left:auto;">
                            <button id="settingsBtn" class="control-btn" title="Einstellungen">⚙️</button>
                            <button id="fullscreenBtn" class="control-btn" title="Vollbild">⛶</button>
                        </div>
                    </div>
                </div>
                <div id="settingsMenu" style="display:none;position:absolute;right:24px;bottom:60px;background:#232323;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,0.3);padding:18px 24px;z-index:10;color:#fff;min-width:180px;">
                    <div style='font-weight:bold;margin-bottom:10px;'>Einstellungen</div>
                    <div style='margin-bottom:8px;'>
                        <label style='font-size:1rem;'>Wiedergabegeschwindigkeit:</label><br>
                        <select id="playbackRateSelect" style='margin-top:4px;width:100%;background:#181818;color:#fff;border-radius:6px;padding:4px;'>
                            <option value="0.5">0.5x</option>
                            <option value="0.75">0.75x</option>
                            <option value="1" selected>1x (Normal)</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>
                </div>
            </div>
            <h2 style="margin:18px 0 8px 0;">${video.title}</h2>
            <div style="color:#aaa;">${video.author} • ${video.views} • ${video.date}</div>
            <p style="margin-top:18px;">Beschreibung des Videos...</p>
            <button id="backBtn" style="margin-top:24px;padding:10px 24px;border-radius:24px;background:#1db954;color:#fff;border:none;font-size:1rem;cursor:pointer;">Zurück zur Übersicht</button>
        </div>
    `;
    // Custom Controls Logic
    const vid = document.getElementById('customVideo');
    const controls = document.getElementById('customControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekBar = document.getElementById('seekBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const nextVideoBtn = document.getElementById('nextVideoBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsMenu = document.getElementById('settingsMenu');
    const playbackRateSelect = document.getElementById('playbackRateSelect');
    let controlsTimeout;
    let lastVolume = 1;

    function formatTime(t) {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function showControls() {
        controls.style.opacity = '1';
        controls.style.pointerEvents = 'auto';
        if (controlsTimeout) clearTimeout(controlsTimeout);
        if (!vid.paused) {
            controlsTimeout = setTimeout(() => {
                controls.style.opacity = '0';
                controls.style.pointerEvents = 'none';
                settingsMenu.style.display = 'none';
            }, 2200);
        }
    }
    function hideControls() {
        controls.style.opacity = '0';
        controls.style.pointerEvents = 'none';
        settingsMenu.style.display = 'none';
    }

    vid.addEventListener('loadedmetadata', () => {
        seekBar.max = vid.duration;
        duration.textContent = formatTime(vid.duration);
    });
    vid.addEventListener('timeupdate', () => {
        // Fließende Progressbar mit CSS-Background
        seekBar.value = vid.currentTime;
        currentTime.textContent = formatTime(vid.currentTime);
        // Dynamischer Verlauf für die Progressbar
        const percent = (vid.currentTime / vid.duration) * 100;
        seekBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #444 ${percent}%, #444 100%)`;
    });
    seekBar.addEventListener('input', () => {
        vid.currentTime = seekBar.value;
        // Sofortiges Update der Progressbar beim Ziehen
        const percent = (seekBar.value / seekBar.max) * 100;
        seekBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${percent}%, #444 ${percent}%, #444 100%)`;
    });
    vid.addEventListener('loadedmetadata', () => {
        seekBar.max = vid.duration;
        duration.textContent = formatTime(vid.duration);
        seekBar.value = 0;
        seekBar.style.background = 'linear-gradient(to right, #1db954 0%, #1db954 0%, #444 0%, #444 100%)';
    });
    playPauseBtn.onclick = () => {
        if (vid.paused) {
            vid.play();
        } else {
            vid.pause();
        }
    };
    vid.addEventListener('play', () => {
        playPauseBtn.textContent = '⏸️';
        showControls();
    });
    vid.addEventListener('pause', () => {
        playPauseBtn.textContent = '▶️';
        showControls();
    });
    // Volume/Mute
    volumeBar.addEventListener('input', () => {
        vid.volume = volumeBar.value;
        if (vid.volume === 0) {
            muteBtn.textContent = '🔇';
        } else if (vid.volume < 0.5) {
            muteBtn.textContent = '🔉';
        } else {
            muteBtn.textContent = '🔊';
        }
        if (vid.volume > 0) lastVolume = vid.volume;
    });
    muteBtn.onclick = () => {
        if (vid.volume > 0) {
            lastVolume = vid.volume;
            vid.volume = 0;
            volumeBar.value = 0;
            muteBtn.textContent = '🔇';
        } else {
            vid.volume = lastVolume || 1;
            volumeBar.value = vid.volume;
            muteBtn.textContent = vid.volume < 0.5 ? '🔉' : '🔊';
        }
    };
    // Next Video
    nextVideoBtn.onclick = () => {
        let nextIdx = (idx + 1) % videos.length;
        history.pushState({video: nextIdx}, '', '?v=' + nextIdx);
        showVideoByIndex(nextIdx);
    };
    // Settings
    settingsBtn.onclick = (e) => {
        e.stopPropagation();
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
        showControls();
    };
    playbackRateSelect.onchange = () => {
        vid.playbackRate = parseFloat(playbackRateSelect.value);
    };
    // Hide settings on click outside
    document.addEventListener('click', function hideSettingsMenu(e) {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
            settingsMenu.style.display = 'none';
            document.removeEventListener('click', hideSettingsMenu);
        }
    });
    // Fullscreen
    fullscreenBtn.onclick = () => {
        const container = vid.parentElement;
        if (container.requestFullscreen) container.requestFullscreen();
        else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
        else if (container.msRequestFullscreen) container.msRequestFullscreen();
    };
    // Overlay Controls: Mousemove/Touch
    const container = vid.parentElement;
    container.addEventListener('mousemove', showControls);
    container.addEventListener('mouseleave', hideControls);
    container.addEventListener('touchstart', showControls);
    // Prevent controls from hiding while interacting
    controls.addEventListener('mouseenter', () => {
        if (controlsTimeout) clearTimeout(controlsTimeout);
        controls.style.opacity = '1';
    });
    controls.addEventListener('mouseleave', () => {
        if (!vid.paused) showControls();
    });
    // Start with controls visible
    showControls();
    // Autoplay
    vid.play();
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