// Beispielhafte Video-Daten
const videos = [
    {
        title: "Star Wars Fanfilm",
        thumb: "img/heitel.jpg",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        author: "Heitel",
        authorImg: "img/HeitelKopf_trans.ico", // Updated author profile image
        views: "1.234 Aufrufe",
        date: "vor 1 Tag"
    },
    {
        title: "Heitel erklärt JavaScript",
        thumb: "img/heitel.jpg",
        src: "https://www.w3schools.com/html/movie.mp4",
        author: "Marco",
        authorImg: "img/HeitelKopf_trans.ico", // Updated author profile image
        views: "987 Aufrufe",
        date: "vor 2 Tagen"
    },
    {
        title: "CSS für Anfänger",
        thumb: "img/css.jpg",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        author: "Sigma",
        authorImg: "img/HeitelKopf_trans.ico",
        views: "2.345 Aufrufe",
        date: "vor 3 Tagen"
    },
    {
        title: "HTML Basics",
        thumb: "img/html.jpg",
        src: "https://www.w3schools.com/html/movie.mp4",
        author: "Heitel",
        authorImg: "img/HeitelKopf_trans.ico",
        views: "1.678 Aufrufe",
        date: "vor 4 Tagen"
    },
    {
        title: "React Einführung",
        thumb: "img/react.jpg",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        author: "Heitel",
        authorImg: "img/HeitelKopf_trans.ico",
        views: "3.456 Aufrufe",
        date: "vor 5 Tagen"
    },
    {
        title: "Node.js Grundlagen",
        thumb: "img/node.jpg",
        src: "https://www.w3schools.com/html/movie.mp4",
        author: "Heitel",
        authorImg: "img/HeitelKopf_trans.ico",
        views: "2.789 Aufrufe",
        date: "vor 6 Tagen"
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
                <div class="video-meta">
                    <img src="${video.authorImg}" alt="Author" class="author-img"> ${video.author} • ${video.views} • ${video.date}
                </div>
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
        <div class="video-page">
            <div class="video-player-section">
                <div class="video-player-container">
                    <video id="customVideo" src="${video.src}" class="video-element" preload="metadata"></video>
                    <div id="customControls" class="video-controls-overlay">
                        <div class="seekbar-row">
                            <input id="seekBar" type="range" min="0" max="100" value="0" step="0.01">
                        </div>
                        <div class="controls-row">
                            <div class="controls-left">
                                <button id="playPauseBtn" class="control-btn" title="Play/Pause">▶️</button>
                                <button id="nextVideoBtn" class="control-btn" title="Nächstes Video">⏭️</button>
                                <span id="currentTime" class="time-display">0:00</span>
                                <span class="time-separator">/</span>
                                <span id="duration" class="time-display">0:00</span>
                                <button id="muteBtn" class="control-btn" title="Mute/Unmute">🔊</button>
                                <input id="volumeBar" type="range" min="0" max="1" step="0.01" value="1" class="volume-bar">
                                </div>
                                <div class="controls-right">
                                    <button id="settingsBtn" class="control-btn" title="Einstellungen">⚙️</button>
                                    <button id="fullscreenBtn" class="control-btn" title="Vollbild">⛶</button>
                                </div>
                        </div>
                    </div>
                    <div id="settingsMenu" class="settings-menu">
                        <div class="settings-title">Einstellungen</div>
                        <div class="settings-item">
                            <label>Wiedergabegeschwindigkeit:</label>
                            <select id="playbackRateSelect" class="playback-rate-select">
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
                <h2 class="video-title">${video.title}</h2>
                <div class="video-meta">
                    <img src="${video.authorImg}" alt="Author" class="author-img"> ${video.author} • ${video.views} • ${video.date}
                </div>
                <p class="video-description">Beschreibung des Videos...</p>
                <button id="backBtn" class="back-btn">Zurück zur Übersicht</button>
            </div>
            <div class="recommended-section">
                <h3 class="recommended-title">Empfohlene Videos</h3>
                <ul class="recommended-list">
                    ${videos.map((v, i) => {
                        if (i !== idx) {
                            return `
                                <li class="recommended-video" onclick="showVideoByIndex(${i})">
                                    <img src="${v.thumb}" alt="Thumbnail" class="recommended-thumb">
                                    <div class="recommended-info">
                                        <div class="recommended-title">${v.title}</div>
                                        <div class="recommended-meta">
                                            <img src="${v.authorImg}" alt="Author" class="author-img"> ${v.author}
                                        </div>
                                        <div class="recommended-extra">${v.views} • ${v.date}</div>
                                    </div>
                                </li>
                            `;
                        }
                        return '';
                    }).join('')}
                </ul>
            </div>
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
        playPauseBtn.innerHTML = '<span class="material-icons-round">pause</span>';
        showControls();
    });
    vid.addEventListener('pause', () => {
        playPauseBtn.innerHTML = '<span class="material-icons-round">play_arrow</span>';
        showControls();
    });
    // Volume/Mute
    muteBtn.innerHTML = vid.volume === 0 ? '<span class="material-icons-round">volume_off</span>' : (vid.volume < 0.5 ? '<span class="material-icons-round">volume_down</span>' : '<span class="material-icons-round">volume_up</span>');
    volumeBar.addEventListener('input', () => {
        vid.volume = volumeBar.value;
        muteBtn.innerHTML = vid.volume === 0 ? '<span class="material-icons-round">volume_off</span>' : (vid.volume < 0.5 ? '<span class="material-icons-round">volume_down</span>' : '<span class="material-icons-round">volume_up</span>');
        if (vid.volume > 0) lastVolume = vid.volume;
    });
    muteBtn.onclick = () => {
        if (vid.volume > 0) {
            lastVolume = vid.volume;
            vid.volume = 0;
            volumeBar.value = 0;
            muteBtn.innerHTML = '<span class="material-icons-round">volume_off</span>';
        } else {
            vid.volume = lastVolume || 1;
            volumeBar.value = vid.volume;
            muteBtn.innerHTML = vid.volume < 0.5 ? '<span class="material-icons-round">volume_down</span>' : '<span class="material-icons-round">volume_up</span>';
        }
    };
    // Next Video
    nextVideoBtn.innerHTML = '<span class="material-icons-round">skip_next</span>';
    nextVideoBtn.onclick = () => {
        let nextIdx = (idx + 1) % videos.length;
        history.pushState({video: nextIdx}, '', '?v=' + nextIdx);
        showVideoByIndex(nextIdx);
    };
    // Settings
    settingsBtn.innerHTML = '<span class="material-icons-round">settings</span>';
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
    fullscreenBtn.innerHTML = '<span class="material-icons-round">fullscreen</span>';
    fullscreenBtn.onclick = () => {
        const container = vid.parentElement;
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) container.requestFullscreen();
            else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
            else if (container.msRequestFullscreen) container.msRequestFullscreen();
            fullscreenBtn.innerHTML = '<span class="material-icons-round">fullscreen_exit</span>';
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            fullscreenBtn.innerHTML = '<span class="material-icons-round">fullscreen</span>';
        }
    };
    document.addEventListener('fullscreenchange', () => {
        fullscreenBtn.innerHTML = document.fullscreenElement 
            ? '<span class="material-icons-round">fullscreen_exit</span>' 
            : '<span class="material-icons-round">fullscreen</span>';
    });
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

function renderSearchSuggestions(results) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    suggestionsContainer.innerHTML = '';
    if (results.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }
    suggestionsContainer.style.display = 'block';
    results.forEach((video, idx) => {
        const suggestion = document.createElement('div');
        suggestion.className = 'search-suggestion';
        suggestion.innerHTML = `
            <img src="${video.thumb}" alt="Thumbnail" class="suggestion-thumb">
            <div class="suggestion-info">
                <div class="suggestion-title">${video.title}</div>
                <div class="suggestion-meta">${video.author} • ${video.views}</div>
            </div>
        `;
        suggestion.onclick = () => {
            history.pushState({ video: idx }, '', '?v=' + idx);
            showVideoByIndex(idx);
        };
        suggestionsContainer.appendChild(suggestion);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const idx = getVideoIndexFromURL();
    if (idx !== null && !isNaN(idx)) {
        showVideoByIndex(idx);
    } else {
        renderVideos(videos);
    }
    const searchInput = document.getElementById('search');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'searchSuggestions';
    suggestionsContainer.style.display = 'none';
    suggestionsContainer.style.position = 'absolute';
    suggestionsContainer.style.background = '#232323';
    suggestionsContainer.style.borderRadius = '8px';
    suggestionsContainer.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    suggestionsContainer.style.padding = '12px';
    suggestionsContainer.style.width = '100%';
    suggestionsContainer.style.maxWidth = '600px';
    suggestionsContainer.style.zIndex = '10';
    searchInput.parentElement.appendChild(suggestionsContainer);

    searchInput.addEventListener('input', e => {
        const q = e.target.value.toLowerCase();
        const results = videos.filter(v => 
            v.title.toLowerCase().includes(q) || v.author.toLowerCase().includes(q)
        );
        renderSearchSuggestions(results);
    });

    searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const q = searchInput.value.trim().toLowerCase();
            const results = videos.filter(v => 
                v.title.toLowerCase().includes(q) || v.author.toLowerCase().includes(q)
            );
            const queryDisplay = document.getElementById('search-query-display');
            queryDisplay.style.display = 'block';
            queryDisplay.textContent = `Suchergebnisse für "${searchInput.value.trim()}"`;
            renderVideos(results);
            if (results.length === 0) {
                const grid = document.getElementById('video-grid');
                grid.innerHTML = '<div style="color:#fff;font-size:1.2rem;padding:32px;">Keine Videos gefunden.</div>';
            }
        }
    });

    document.addEventListener('click', e => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
});

window.addEventListener('popstate', () => {
    const idx = getVideoIndexFromURL();
    if (idx !== null && !isNaN(idx)) {
        showVideoByIndex(idx);
    } else {
        renderVideos(videos);
    }
});