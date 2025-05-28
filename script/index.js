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
            <video class="video-thumb" src="${video.src}" muted loop></video>
            <div class="video-info">
                <div class="video-title">${video.title}</div>
                <div class="video-meta" style="display: flex; align-items: center; gap: 8px;">
                    <img src="img/HeitelKopf_trans.png" alt="Profilbild" style="width: 28px; height: 28px; border-radius: 50%;">
                    <span>${video.author}</span>
                    <span>•</span>
                    <span>${video.views}</span>
                    <span>•</span>
                    <span>${video.date}</span>
                </div>
            </div>
        `;
        card.onmouseover = () => {
            const videoElement = card.querySelector('.video-thumb');
            videoElement.play();
        };
        card.onmouseout = () => {
            const videoElement = card.querySelector('.video-thumb');
            videoElement.pause();
            videoElement.currentTime = 0;
        };
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

    const videoPlayerPage = document.getElementById('video-player-page');
    const videoGrid = document.getElementById('video-grid');
    videoGrid.style.display = 'none';
    videoPlayerPage.style.display = 'flex';

    const videoElement = videoPlayerPage.querySelector('#video-player video');
    const videoTitle = videoPlayerPage.querySelector('#video-details h1');
    const videoMeta = videoPlayerPage.querySelector('#video-details .meta');
    const videoDescription = videoPlayerPage.querySelector('#video-details .description');

    videoElement.src = video.src;
    videoTitle.textContent = video.title;

    videoMeta.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <img src="img/HeitelKopf_trans.png" alt="Profilbild" style="width: 28px; height: 28px; border-radius: 50%;">
            <span>${video.author}</span> • <span>${video.views}</span> • <span>${video.date}</span>
        </div>
    `;

    videoDescription.textContent = 'Beschreibung des Videos...';

    renderRecommendedVideos(idx);
}

function renderRecommendedVideos(currentIdx) {
    const recommendedContainer = document.getElementById('recommended-videos');
    recommendedContainer.innerHTML = '';
    videos.forEach((video, idx) => {
        if (idx === currentIdx) return;

        const card = document.createElement('div');
        card.className = 'recommended-video-card';
        card.onclick = () => {
            history.pushState({ video: idx }, '', '?v=' + idx);
            showVideoByIndex(idx);
        };

        card.innerHTML = `
            <img class="recommended-video-thumb" src="${video.thumb}" alt="">
            <div class="recommended-video-info">
                <div class="recommended-video-title">${video.title}</div>
                <div class="recommended-video-meta">${video.author} • ${video.views}</div>
            </div>
        `;
        recommendedContainer.appendChild(card);
    });
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
        grid.innerHTML = '<div style="color:#fff;font-size:1.2rem;padding:32px;text-align:center;">Keine Videos gefunden.</div>';
        return;
    }
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '32px';
    list.style.margin = '0';
    list.style.maxWidth = '800px';
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
        li.style.padding = '18px';
        li.style.borderBottom = '1px solid #333';
        li.style.cursor = 'pointer';
        li.style.transition = 'background 0.2s, transform 0.2s';
        li.onmouseover = () => li.style.background = '#2a2a2a';
        li.onmouseout = () => li.style.background = 'transparent';
        li.onclick = () => {
            history.pushState({video: idx}, '', '?v=' + videos.indexOf(video));
            showVideoByIndex(videos.indexOf(video));
        };

        const thumb = document.createElement('img');
        thumb.src = video.thumb;
        thumb.alt = '';
        thumb.style.width = '308px';
        thumb.style.height = '172px';
        thumb.style.objectFit = 'cover';
        thumb.style.borderRadius = '8px';
        thumb.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';

        const info = document.createElement('div');
        info.style.display = 'flex';
        info.style.flexDirection = 'column';
        info.style.gap = '4px';

        const title = document.createElement('span');
        title.textContent = video.title;
        title.style.fontSize = '1.1rem';
        title.style.color = '#fff';
        title.style.fontWeight = 'bold';

        const meta = document.createElement('div');
        meta.style.display = 'flex';
        meta.style.alignItems = 'center';
        meta.style.gap = '8px';

        // Entferne das Profilbild und zeige stattdessen den Autorennamen an
        const author = document.createElement('span');
        author.textContent = video.author;
        author.style.fontSize = '0.9rem';
        author.style.color = '#aaa';

        // Füge das Profilbild links vom Autorennamen hinzu
        const profilePic = document.createElement('img');
        profilePic.src = 'img/HeitelKopf_trans.png'; // Beispiel-Profilbild
        profilePic.alt = 'Profilbild';
        profilePic.style.width = '28px';
        profilePic.style.height = '28px';
        profilePic.style.borderRadius = '50%';

        meta.appendChild(profilePic);
        meta.appendChild(author);

        const viewsAndDate = document.createElement('span');
        viewsAndDate.textContent = `${video.views} • ${video.date}`;
        viewsAndDate.style.fontSize = '0.9rem';
        viewsAndDate.style.color = '#aaa';

        info.appendChild(title);
        info.appendChild(meta);
        info.appendChild(viewsAndDate);
        li.appendChild(thumb);
        li.appendChild(info);
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
        document.getElementById('video-player-page').style.display = 'none';
        document.getElementById('video-grid').style.display = 'grid';
        renderVideos(videos);
    }
});

function initializeCustomVideoPlayer() {
    const videoElement = document.querySelector('.custom-video-player video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const progressBar = document.querySelector('.video-progress-bar');
    const progressContainer = document.querySelector('.video-progress-container');
    const progressThumb = document.querySelector('.video-progress-thumb');
    let isDragging = false;

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
            playPauseBtn.querySelector('.material-icons').textContent = 'pause';
        } else {
            videoElement.pause();
            playPauseBtn.querySelector('.material-icons').textContent = 'play_arrow';
        }
    });

    // Rewind 10 seconds
    prevBtn.addEventListener('click', () => {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 10);
    });

    // Forward 10 seconds
    nextBtn.addEventListener('click', () => {
        videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 10);
    });

    // Update progress bar and thumb position as video plays
    videoElement.addEventListener('timeupdate', () => {
        if (!isDragging) {
            const progress = (videoElement.currentTime / videoElement.duration) * 100;
            progressBar.style.width = `${progress}%`;
            progressThumb.style.left = `${progress}%`;
        }
    });

    // Start dragging the progress thumb
    progressThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    });

    // Drag the progress thumb
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = progressContainer.getBoundingClientRect();
            const offsetX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
            const progress = (offsetX / rect.width) * 100;
            progressBar.style.width = `${progress}%`;
            progressThumb.style.left = `${progress}%`;
        }
    });

    // Stop dragging and update video time
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            document.body.style.userSelect = ''; // Re-enable text selection
            const rect = progressContainer.getBoundingClientRect();
            const offsetX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
            const newTime = (offsetX / rect.width) * videoElement.duration;
            videoElement.currentTime = newTime;
        }
    });

    // Seek functionality with immediate thumb update
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const newTime = (offsetX / rect.width) * videoElement.duration;
        videoElement.currentTime = newTime;

        // Update progress bar and thumb immediately
        const progress = (newTime / videoElement.duration) * 100;
        progressBar.style.width = `${progress}%`;
        progressThumb.style.left = `${progress}%`;
    });

    // Show and move the thumb when the cursor is near the progress bar
    progressContainer.addEventListener('mousemove', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const progress = Math.min(Math.max(offsetX / rect.width, 0), 1); // Clamp between 0 and 1
        progressThumb.style.left = `${progress * 100}%`; // Sync thumb with cursor
    });

    progressContainer.addEventListener('mouseenter', () => {
        progressThumb.style.display = 'block';
    });

    progressContainer.addEventListener('mouseleave', () => {
        progressThumb.style.display = 'none';
    });

    // Volume toggle functionality
    volumeBtn.addEventListener('click', () => {
        videoElement.muted = !videoElement.muted;
        volumeBtn.querySelector('.material-symbols-rounded').textContent = videoElement.muted ? 'volume_off' : 'volume_up';
    });

    // Volume slider functionality
    volumeSlider.addEventListener('input', (e) => {
        videoElement.volume = e.target.value;
        videoElement.muted = videoElement.volume === 0;
        volumeBtn.querySelector('.material-symbols-rounded').textContent = videoElement.muted ? 'volume_off' : 'volume_up';
    });

    // Sync volume slider with video volume
    videoElement.addEventListener('volumechange', () => {
        volumeSlider.value = videoElement.volume;
    });

    // Settings button functionality (placeholder)
    settingsBtn.addEventListener('click', () => {
        alert('Settings menu not implemented yet.');
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            videoElement.parentElement.requestFullscreen();
        }
    });
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    initializeCustomVideoPlayer();
});

document.addEventListener('keydown', (e) => {
    const videoElement = document.querySelector('.custom-video-player video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (!videoElement || !playPauseBtn) return;

    if (e.key === 'ArrowLeft') {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
    } else if (e.key === 'ArrowRight') {
        videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
    } else if (e.key === ' ') {
        e.preventDefault(); // Prevent scrolling when pressing space
        if (videoElement.paused) {
            videoElement.play();
        } else {
            videoElement.pause();
        }
    }
});

const videoElement = document.querySelector('.custom-video-player video');
if (videoElement) {
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (playPauseBtn) {
        videoElement.addEventListener('play', () => {
            playPauseBtn.querySelector('.material-symbols-rounded').textContent = 'pause';
        });

        videoElement.addEventListener('pause', () => {
            playPauseBtn.querySelector('.material-symbols-rounded').textContent = 'play_arrow';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const videoElement = document.querySelector('.custom-video-player video');

    settingsBtn.addEventListener('click', () => {
        settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
    });

    settingsMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const quality = e.target.getAttribute('data-quality');
            alert(`Videoqualität geändert zu: ${quality}`); // Placeholder for actual quality change logic
            settingsMenu.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
            settingsMenu.style.display = 'none';
        }
    });
});