// --- MAIN.JS ---
// --- GLOBAL DATA & UTILITY FUNCTIONS ---
let mockApiData = {};
let selectedGenre = null;
let selectedYear = null;
let selectedLetter = null;
let selectedRating = null;
let selectedCast = null;
let userToReset = null;
let users = [];
let admins = [];
let viewHistory = [];
let featuredScrollInterval;

const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('admins', JSON.stringify(admins));
};

// Function to load or initialize data from localStorage
function loadDatabase() {
    const savedData = localStorage.getItem('movieDatabase');
    if (savedData) {
        mockApiData = JSON.parse(savedData);
    } else {
        mockApiData = initialData; // from database.js
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
    }
    
    users = JSON.parse(localStorage.getItem('users')) || [];
    admins = JSON.parse(localStorage.getItem('admins')) || ['rpranta'];

    // Ensure admin user exists but hide the password
    if (!users.find(user => user.name === 'rpranta')) {
        users.push({ name: 'rpranta', pass: '12345678', fullName: 'R Pranta' });
        saveUsers();
    }
}

function displaySocialIcons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const links = mockApiData.socialLinks || {};
    container.innerHTML = Object.entries(links).map(([name, url]) => {
        if (!url) return '';
        const iconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
        return `
            <a href="${url}" target="_blank" class="text-white hover:opacity-75 transition-opacity" title="${name}">
                <img src="${iconUrl}" alt="${name}" class="w-6 h-6 rounded-full" onerror="this.style.display='none'">
            </a>
        `;
    }).join('');
}

function renderAdContent(container, content, defaultText) {
    if (!container) return;
    // Check if content is a URL to an image
    if (content && (content.startsWith('http') || content.startsWith('https:')) && /\.(jpe?g|png|gif|webp)$/i.test(content)) {
        container.innerHTML = `<img src="${content}" alt="Ad" class="w-full h-full object-cover">`;
    } else if (content) { // Assumes it's HTML/script code
        container.innerHTML = content;
    } else { // Fallback text
        container.innerHTML = `<div class="p-2">${defaultText}</div>`;
    }
}

function displayAds() {
    const adCodes = mockApiData.ads || {};
    // Left Sidebar
    renderAdContent(document.getElementById('ad-left-1'), adCodes.adLeft1, 'Adsterra 160x300');
    renderAdContent(document.getElementById('ad-left-img-1'), adCodes.adLeftImg1, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-left-img-2'), adCodes.adLeftImg2, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-left-img-3'), adCodes.adLeftImg3, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-left-img-4'), adCodes.adLeftImg4, 'Image Ad 180x320');

    // Right Sidebar
    loadSidebarPlayer();
    renderAdContent(document.getElementById('ad-right-1'), adCodes.right1, 'Adsterra 320x250');
    renderAdContent(document.getElementById('ad-right-2'), adCodes.right2, 'Adsterra 160x600');
    renderAdContent(document.getElementById('ad-right-native'), adCodes.rightNative, 'Adsterra Native');
    renderAdContent(document.getElementById('ad-right-img-1'), adCodes.rightImg1, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-right-img-2'), adCodes.rightImg2, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-right-img-3'), adCodes.rightImg3, 'Image Ad 180x320');
    renderAdContent(document.getElementById('ad-right-468x60'), adCodes.right468x60, 'Adsterra 468x60');
    renderAdContent(document.getElementById('ad-right-320x50'), adCodes.right320x50, 'Adsterra 320x50');
    
    // Body-level ads
    renderAdContent(document.getElementById('ad-social-bar'), adCodes.adSocialBar, '');
    renderAdContent(document.getElementById('ad-popunder'), adCodes.adPopunder, '');
    renderAdContent(document.getElementById('ad-footer-728x90'), adCodes.adFooter728x90, 'Adsterra 728x90');
}

function loadSidebarPlayer() {
    const playerContainer = document.getElementById('right-sidebar-player');
    if (!playerContainer) return;

    const videoUrl = mockApiData.ads.sidebarVideo;
    if (!videoUrl) {
        playerContainer.innerHTML = '';
        return;
    }

    let embedUrl = '';
    if (videoUrl.includes('youtube.com/watch?v=')) {
        const videoId = new URL(videoUrl).searchParams.get('v');
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`;
    } else if (videoUrl.includes('youtu.be/')) {
        const videoId = new URL(videoUrl).pathname.slice(1);
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1`;
    } else if (videoUrl.includes('drive.google.com')) {
        embedUrl = videoUrl.replace('/view', '/preview');
    }

    if (embedUrl) {
        playerContainer.innerHTML = `<iframe id="sidebar-iframe-player" class="w-full aspect-video" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        playerContainer.innerHTML = '';
    }
}


// --- GLOBAL APP FUNCTIONS (accessible by onclick) ---
function findMovieById(movieId) {
    // Flatten all movie arrays from all categories into a single array
    const allMovies = Object.values(mockApiData.movies).flat();
    // Find the movie with the matching ID
    return allMovies.find(m => m.id === movieId) || null;
}

function openDownloadLinks(event, movieId, linkName, movieUrl) {
    event.stopPropagation(); // Prevent modal from closing if the button is inside it

    const movie = findMovieById(movieId);
    if (movie && movie.download_links) {
        const link = movie.download_links.find(l => l.name === linkName);
        if (link) {
            link.clicks = (link.clicks || 0) + 1;
            localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
            // Refresh the button text to show updated count
            const button = event.currentTarget;
            const countSpan = button.querySelector('.click-count');
            if(countSpan) countSpan.textContent = `(${link.clicks} clicks)`;
        }
    }
    
    const fixedUrl = 'https://panchaanukabyo.short.gy/DirectLink_1M';
    window.open(fixedUrl, '_blank');
    if (movieUrl && movieUrl !== '#') {
        window.open(movieUrl, '_blank');
    }
}

function closeModal(modalId) {
    const modalToClose = document.getElementById(modalId);
    const sidebarPlayer = document.getElementById('sidebar-iframe-player');

    if (modalToClose) {
        const content = modalToClose.querySelector('.transform');
        if (content) {
            content.classList.add('scale-95');
        }
        setTimeout(() => modalToClose.classList.add('hidden'), 300);
        
        // Stop video playback on close
        if (modalId === 'trailer-modal' || modalId === 'stream-modal') {
            const videoContent = document.getElementById(modalId === 'trailer-modal' ? 'trailer-content' : 'stream-content');
            if(videoContent) videoContent.innerHTML = '';
            // Resume sidebar player
            if (sidebarPlayer && sidebarPlayer.src.includes('youtube')) {
                sidebarPlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        }
    }
}

function playStream(streamUrl) {
    window.open('https://panchaanukabyo.short.gy/DirectLink_1M', '_blank');
    const sidebarPlayer = document.getElementById('sidebar-iframe-player');
    if (sidebarPlayer && sidebarPlayer.src.includes('youtube')) {
        sidebarPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    
    const streamModal = document.getElementById('stream-modal');
    const streamContent = document.getElementById('stream-content');
    
    if (streamUrl) {
        streamContent.innerHTML = `<iframe class="w-full h-full" src="${streamUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        streamModal.classList.remove('hidden');
         setTimeout(() => streamModal.querySelector('.transform').classList.remove('scale-95'), 10);
    } else {
        showNotification('Stream URL is not available.');
    }
}

function playTrailer(trailerUrl) {
    window.open('https://panchaanukabyo.short.gy/DirectLink_1M', '_blank');
    const sidebarPlayer = document.getElementById('sidebar-iframe-player');
    if (sidebarPlayer && sidebarPlayer.src.includes('youtube')) {
        sidebarPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    const trailerModal = document.getElementById('trailer-modal');
    const trailerContent = document.getElementById('trailer-content');
    
    let videoId = '';
    try {
        const url = new URL(trailerUrl);
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        } else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
            if (url.pathname.startsWith('/embed/')) {
                 videoId = url.pathname.split('/')[2];
            } else {
                 videoId = url.searchParams.get('v');
            }
        }
    } catch (e) {
        console.error("Invalid Trailer URL:", trailerUrl);
        showNotification('Could not process the trailer link.');
        return;
    }


    if (videoId) {
        trailerContent.innerHTML = `<iframe class="w-full h-full" src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        trailerModal.classList.remove('hidden');
         setTimeout(() => trailerModal.querySelector('.transform').classList.remove('scale-95'), 10);
    } else {
        showNotification('Invalid YouTube trailer URL.');
    }
}

function showMovieDetails(movieId) {
    const movie = findMovieById(movieId);
    if (!movie) return;

    const modalContentWrapper = document.getElementById('modal-content-wrapper');
    const detailsModal = document.getElementById('movie-details-modal');
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/374151?text=No+Image';
    const downloadLinks = movie.download_links || [];
    const comments = movie.comments || [];
    const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : movie.release_year;

    const detailsHtml = `
        <div class="mt-4 space-y-2 text-sm movie-details-info">
            <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
            <p><strong>Running Time:</strong> ${movie.runningTime || 'N/A'}</p>
            <p><strong>Budget:</strong> ${movie.budget || 'N/A'}</p>
            <p><strong>Cast:</strong> ${movie.cast || 'N/A'}</p>
        </div>
    `;

    modalContentWrapper.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8 p-8">
            <div class="md:w-1/3 flex-shrink-0">
                <img src="${posterUrl}" alt="${movie.title}" class="w-full rounded-lg shadow-lg">
                <div class="hidden md:block">${detailsHtml}</div>
            </div>
            <div class="md:w-2/3">
                <div class="flex justify-between items-start">
                     <h2 class="text-3xl font-bold mb-2">${movie.title} <span class="text-2xl font-normal text-gray-400">(${movie.release_year})</span></h2>
                     <button onclick="closeModal('movie-details-modal')" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                     </button>
                </div>
                <div class="flex items-center gap-4 mb-4 text-gray-400">
                    <span>Rating: <span class="font-bold text-lg text-amber-400">★ ${movie.vote_average.toFixed(1)}</span> / 10</span>
                    <span class="text-sm">Release: ${releaseDate}</span>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${movie.genres ? movie.genres.map(genre => `<span class="bg-neutral-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${genre}</span>`).join('') : ''}
                </div>
                <h3 class="text-lg font-semibold mb-2">Overview</h3>
                <p class="leading-relaxed text-sm">${movie.overview}</p>
                
                <div class="block md:hidden">${detailsHtml}</div>

                <div class="mt-6 flex gap-2">
                    ${movie.stream_url ? `
                    <button onclick="playStream('${movie.stream_url}')" class="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Stream Now
                    </button>
                    ` : ''}
                    ${movie.trailer_url ? `
                     <button onclick="playTrailer('${movie.trailer_url}')" class="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Watch Trailer
                    </button>
                    ` : ''}
                </div>

                <div class="mt-8">
                    <h3 class="text-lg font-semibold mb-3">Download Options</h3>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        ${downloadLinks.map(link => `
                            <button onclick="openDownloadLinks(event, ${movie.id}, '${link.name}', '${link.url || '#'}')" class="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                <span>${link.name} ${link.size ? `(${link.size})` : ''} <span class="click-count text-xs opacity-75">(${link.clicks || 0} clicks)</span></span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-8">
                    <h3 class="text-lg font-semibold mb-3">Share this Movie</h3>
                    <div class="flex gap-2" id="share-buttons">
                        <!-- Share buttons will be injected here -->
                    </div>
                </div>
                
                ${admins.includes(localStorage.getItem('currentUser')) ? `
                <div class="mt-4">
                    <button onclick="openEditMovieModal(${movie.id})" class="w-full bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        Edit Details
                    </button>
                </div>
                ` : ''}

            </div>
        </div>
        <div class="px-8 pb-8 border-t border-neutral-700">
            <h3 class="text-xl font-bold mt-6 mb-4">Comments</h3>
            <div id="comment-list" class="space-y-4 max-h-64 overflow-y-auto pr-2">
                ${comments.length > 0 ? comments.map((comment, index) => `
                    <div class="comment p-4 rounded-lg flex justify-between items-start">
                        <div>
                            <p class="font-semibold">${comment.username}</p>
                            <p class="text-sm text-gray-400">${comment.date}</p>
                            <p class="mt-2">${comment.text}</p>
                        </div>
                        ${admins.includes(localStorage.getItem('currentUser')) ? `<button onclick="deleteComment(${movie.id}, ${index})" class="text-red-500 hover:text-red-400 text-xs">Delete</button>` : ''}
                    </div>
                `).join('') : '<p class="text-gray-400">No comments yet. Be the first to comment!</p>'}
            </div>
            <form id="comment-form" class="mt-6" data-movie-id="${movie.id}">
                <textarea name="comment" placeholder="Write a comment..." class="form-input w-full p-3 rounded-md focus:ring-red-500 focus:border-red-500" rows="3" required></textarea>
                <button type="submit" class="w-full mt-2 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors">Post Comment</button>
            </form>
        </div>
    `;
    
    const shareButtonsContainer = document.getElementById('share-buttons');
    if(shareButtonsContainer) {
        shareButtonsContainer.innerHTML = `
            <button onclick="shareMovie('facebook', '${movie.title}', ${movie.id})" class="bg-blue-600 text-white p-2 rounded-full"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.14 9.5 5.32v2.14H6v4h3.5v10h4V11.46h3.77l.72-4z"/></svg></button>
            <button onclick="shareMovie('twitter', '${movie.title}', ${movie.id})" class="bg-black text-white p-2 rounded-full"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.602.75Zm-2.25 13.05h1.694L5.405 2.165H3.555z"/></svg></button>
            <button onclick="shareMovie('whatsapp', '${movie.title}', ${movie.id})" class="bg-green-500 text-white p-2 rounded-full"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.75 13.96c.25.5.12 1.04-.12 1.41a1.98 1.98 0 0 1-1.52.85c-.34 0-.68-.06-1.02-.18c-1.44-.55-2.83-1.48-4-2.65c-1.17-1.17-2.1-2.56-2.65-4c-.12-.34-.18-.68-.18-1.02c0-.58.29-1.12.85-1.52c.37-.24.91-.37 1.41-.12c.5.25.83.71.96 1.25c.13.54.06 1.11-.2 1.61l-.48.96c-.13.25-.06.56.18.8l1.79 1.79c.24.24.55.31.8.18l.96-.48c.5-.26 1.07-.33 1.61-.2c.54.13 1 .46 1.25.96zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.59-.55 5.07-1.49L22 22l-1.49-4.93A9.95 9.95 0 0 0 22 12C22 6.48 17.52 2 12 2z"/></svg></button>
            <button onclick="shareMovie('telegram', '${movie.title}', ${movie.id})" class="bg-sky-500 text-white p-2 rounded-full"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-1.37.2-1.64l16.56-6.1c.85-.32 1.62.26 1.38 1.68l-2.25 10.74c-.25 1.13-1.02 1.4-1.91.89l-4.48-3.31l-2.15 2.08c-.23.23-.42.42-.83.42z"/></svg></button>
            <button onclick="shareMovie('native', '${movie.title}', ${movie.id})" class="bg-gray-500 text-white p-2 rounded-full"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002L15.316 6.684m0 10.632a3 3 0 100-10.632m0 10.632a3 3 0 000-10.632"></path></svg></button>
        `;
    }

    document.getElementById('comment-form').addEventListener('submit', handleAddComment);

    detailsModal.classList.remove('hidden');
    setTimeout(() => modalContentWrapper.classList.remove('scale-95'), 10);
}

function shareMovie(platform, title, movieId) {
    const url = `${window.location.origin}${window.location.pathname}#movie-${movieId}`;
    const text = `Check out this movie: ${title}`;
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'native':
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: url,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else {
                showNotification('Web Share API is not supported in your browser.');
            }
            return; // Return early for native share
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
}


function handleAddComment(event) {
    event.preventDefault();
    const form = event.target;
    const movieId = parseInt(form.dataset.movieId);
    const commentText = form.querySelector('textarea[name="comment"]').value.trim();
    
    if (!commentText) return;

    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showNotification('You must be logged in to comment.');
        return;
    }

    const newComment = {
        username: currentUser,
        text: commentText,
        date: new Date().toLocaleString()
    };

    for (const category in mockApiData.movies) {
        const movie = mockApiData.movies[category].find(m => m.id === movieId);
        if (movie) {
            if (!movie.comments) {
                movie.comments = [];
            }
            movie.comments.push(newComment);
            break;
        }
    }
    
    localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
    showMovieDetails(movieId); // Refresh the modal
}

function deleteComment(movieId, commentIndex) {
    if (!admins.includes(localStorage.getItem('currentUser'))) return;
    if (confirm('Are you sure you want to delete this comment?')) {
         for (const category in mockApiData.movies) {
            const movie = mockApiData.movies[category].find(m => m.id === movieId);
            if (movie && movie.comments) {
                movie.comments.splice(commentIndex, 1);
                break;
            }
        }
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
        showMovieDetails(movieId); // Refresh the modal
    }
}

function addDownloadLinkField() {
    const downloadLinksContainer = document.getElementById('download-links-container');
    if (!downloadLinksContainer) return;
    const linkCount = downloadLinksContainer.children.length;
    const newLinkGroup = document.createElement('div');
    newLinkGroup.className = 'download-link-group grid grid-cols-3 gap-2';
    newLinkGroup.innerHTML = `
        <input name="download_name_${linkCount}" type="text" placeholder="Link Name (e.g., 720p)" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
        <input name="download_url_${linkCount}" type="text" placeholder="URL" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
        <input name="download_size_${linkCount}" type="text" placeholder="Size (e.g., 1.5GB)" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
    `;
    downloadLinksContainer.appendChild(newLinkGroup);
}

function openEditMovieModal(movieId) {
    if (!admins.includes(localStorage.getItem('currentUser'))) {
        showNotification('You are not authorized to edit content.');
        return;
    }
    const movie = findMovieById(movieId);
    if (!movie) {
        console.error(`Error: Movie with ID ${movieId} not found.`);
        showNotification(`An error occurred: Could not find movie details.`);
        return;
    }

    closeModal('movie-details-modal');

    const addMovieForm = document.getElementById('add-movie-form');
    addMovieForm.reset();
    addMovieForm.dataset.mode = 'edit';
    addMovieForm.dataset.movieIdToEdit = movieId;

    addMovieForm.querySelector('[name="title"]').value = movie.title;
    
    const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
    if(releaseDate) {
        addMovieForm.querySelector('[name="release_day"]').value = releaseDate.getUTCDate();
        addMovieForm.querySelector('[name="release_month"]').value = releaseDate.getUTCMonth() + 1;
        addMovieForm.querySelector('[name="release_year"]').value = releaseDate.getUTCFullYear();
    }

    addMovieForm.querySelector('[name="poster_path"]').value = movie.poster_path || '';
    addMovieForm.querySelector('[name="trailer_url"]').value = movie.trailer_url || '';
    addMovieForm.querySelector('[name="stream_url"]').value = movie.stream_url || '';
    addMovieForm.querySelector('[name="vote_average"]').value = movie.vote_average;
    addMovieForm.querySelector('[name="overview"]').value = movie.overview;
    addMovieForm.querySelector('[name="director"]').value = movie.director || '';
    addMovieForm.querySelector('[name="runningTime"]').value = movie.runningTime || '';
    addMovieForm.querySelector('[name="budget"]').value = movie.budget || '';
    addMovieForm.querySelector('[name="cast"]').value = movie.cast || '';

    const categorySelect = addMovieForm.querySelector('select[name="category"]');
    let movieCategoryKey = '';
    for (const catKey in mockApiData.movies) {
        if (mockApiData.movies[catKey].some(m => m.id === movieId)) {
            movieCategoryKey = catKey;
            break;
        }
    }
    categorySelect.value = movieCategoryKey;

    const genreSelect = addMovieForm.querySelector('select[name="genres"]');
    Array.from(genreSelect.options).forEach(option => {
        option.selected = movie.genres && movie.genres.includes(option.value);
    });

    const downloadLinksContainer = document.getElementById('download-links-container');
    downloadLinksContainer.innerHTML = '';
    if (movie.download_links && movie.download_links.length > 0) {
        movie.download_links.forEach((link, index) => {
            const newLinkGroup = document.createElement('div');
            newLinkGroup.className = 'download-link-group grid grid-cols-3 gap-2';
            newLinkGroup.innerHTML = `
                <input name="download_name_${index}" type="text" placeholder="Link Name (e.g., 720p)" value="${link.name || ''}" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
                <input name="download_url_${index}" type="text" placeholder="URL" value="${link.url || ''}" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
                <input name="download_size_${index}" type="text" placeholder="Size (e.g., 1.5GB)" value="${link.size || ''}" class="form-input w-full p-2 rounded-md focus:ring-red-500 focus:border-red-500">
            `;
            downloadLinksContainer.appendChild(newLinkGroup);
        });
    } else {
        addDownloadLinkField();
    }

    addMovieForm.querySelector('button[type="submit"]').textContent = 'Save Changes';
    document.getElementById('add-movie-modal').classList.remove('hidden');
     setTimeout(() => document.getElementById('add-movie-modal').querySelector('.transform').classList.remove('scale-95'), 10);
}

function initializeLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupForm = document.getElementById('signup-form');
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginError = document.getElementById('login-error');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const passwordResetModal = document.getElementById('password-reset-modal');
    const passwordResetModalCloseBtn = document.getElementById('password-reset-modal-close-btn');
    const passwordResetForm = document.getElementById('password-reset-form');
    const verifyUserBtn = document.getElementById('verify-user-btn');

    const handleLogin = () => {
        const name = document.getElementById('name').value.trim().toLowerCase();
        const pass = document.getElementById('pass').value;
        
        if (!name || !pass) {
            loginError.textContent = 'Please enter a username and password.';
            loginError.classList.remove('hidden');
            return;
        }

        const user = users.find(u => u.name.toLowerCase() === name && u.pass === pass);

        if (user) {
            loginError.classList.add('hidden');
            localStorage.setItem('currentUser', user.name);
            closeModal('login-modal');
            updateHeaderState();
        } else {
            loginError.textContent = 'Invalid username or password.';
            loginError.classList.remove('hidden');
        }
    };

    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
    });

    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('pass').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    document.getElementById('signup-btn').addEventListener('click', function(event) {
        event.preventDefault();
        const fullName = document.getElementById('new-fullname').value.trim();
        const newName = document.getElementById('new-name').value.trim().toLowerCase();
        const newPass = document.getElementById('new-pass').value;
        const confirmPass = document.getElementById('confirm-pass').value;
        const signupError = document.getElementById('signup-error');
        const usernameError = document.getElementById('signup-username-error');
        const passwordError = document.getElementById('signup-password-error');
        const successMsg = document.getElementById('signup-success-message');

        // Reset errors
        signupError.classList.add('hidden');
        usernameError.classList.add('hidden');
        passwordError.classList.add('hidden');
        successMsg.classList.add('hidden');
        let isValid = true;

        if (!fullName) {
            signupError.textContent = 'Full Name is required.';
            signupError.classList.remove('hidden');
            isValid = false;
        }
        if (newName.length < 5) {
            usernameError.textContent = 'Username must be 5 characters or more.';
            usernameError.classList.remove('hidden');
            isValid = false;
        }
        if (newPass.length < 8) {
            passwordError.textContent = 'Password must be 8 characters or more.';
            passwordError.classList.remove('hidden');
            isValid = false;
        }
        if (newPass !== confirmPass) {
            signupError.textContent = 'Passwords do not match.';
            signupError.classList.remove('hidden');
            isValid = false;
        }
        if (users.find(u => u.name.toLowerCase() === newName)) {
            signupError.textContent = 'Username already exists. Please choose another.';
            signupError.classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) return;
        
        users.push({ name: newName, pass: newPass, fullName: fullName });
        saveUsers();
        updateUserCount();

        successMsg.textContent = `Account for "${newName}" created successfully! You can now log in.`;
        successMsg.classList.remove('hidden');
        
        document.getElementById('signup-form').reset();

        setTimeout(() => {
            successMsg.classList.add('hidden');
            signupForm.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
        }, 3000);
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        passwordResetModal.classList.remove('hidden');
        setTimeout(() => passwordResetModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });

    passwordResetModalCloseBtn.addEventListener('click', () => closeModal('password-reset-modal'));

    verifyUserBtn.addEventListener('click', () => {
        const resetFullName = document.querySelector('input[name="resetFullName"]').value.trim();
        const resetUsername = document.querySelector('input[name="resetUsername"]').value.trim().toLowerCase();
        const resetError = document.getElementById('reset-error');
        const user = users.find(u => u.fullName.toLowerCase() === resetFullName.toLowerCase() && u.name.toLowerCase() === resetUsername);

        if (user) {
            userToReset = user;
            document.getElementById('reset-step-1').classList.add('hidden');
            document.getElementById('reset-step-2').classList.remove('hidden');
            resetError.classList.add('hidden');
        } else {
            resetError.textContent = "Full Name and Username do not match any account.";
            resetError.classList.remove('hidden');
        }
    });

    passwordResetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (userToReset) {
            const newPassword = document.querySelector('input[name="newPassword"]').value;
            const confirmNewPassword = document.querySelector('input[name="confirmNewPassword"]').value;
            const resetPasswordError = document.getElementById('reset-password-error');

            if (newPassword.length < 8) {
                resetPasswordError.textContent = "Password must be 8 characters or more.";
                resetPasswordError.classList.remove('hidden');
                return;
            }

            if (newPassword !== confirmNewPassword) {
                resetPasswordError.textContent = "Passwords do not match.";
                resetPasswordError.classList.remove('hidden');
                return;
            }

            const userIndex = users.findIndex(u => u.name === userToReset.name);
            users[userIndex].pass = newPassword;
            saveUsers();
            showNotification('Password has been reset successfully. You can now log in with your new password.');
            closeModal('password-reset-modal');
            passwordResetForm.reset();
            document.getElementById('reset-step-2').classList.add('hidden');
            document.getElementById('reset-step-1').classList.remove('hidden');
            userToReset = null;
        }
    });
}

function updateHeaderState() {
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('login-btn-header');
    const logoutBtn = document.getElementById('log-out');
    const requestMovieBtn = document.getElementById('request-movie-btn');
    const adminPanelBtn = document.getElementById('admin-panel-btn');
    const activeUserContainer = document.getElementById('active-user-container');
    const activeUserSpan = document.getElementById('active-user');

    if (currentUser) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        activeUserContainer.classList.remove('hidden');
        activeUserSpan.innerHTML = `<span class="welcome-text">Welcome,</span> ${currentUser}`;
        
        if (admins.includes(currentUser)) {
            adminPanelBtn.classList.remove('hidden');
            requestMovieBtn.classList.add('hidden');
            checkForMovieRequests();
        } else {
            adminPanelBtn.classList.add('hidden');
            requestMovieBtn.classList.remove('hidden');
        }
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        activeUserContainer.classList.add('hidden');
        requestMovieBtn.classList.add('hidden');
        adminPanelBtn.classList.add('hidden');
    }
}

function updateUserCount() {
    const totalUsersSpan = document.getElementById('total-users-count-footer');
    if(totalUsersSpan) {
        totalUsersSpan.textContent = users.length.toLocaleString();
    }
}

// --- MAIN APP SCRIPT ---
function initializeMainApp() {
    // --- DOM ELEMENTS ---
    const mainNav = document.getElementById('main-nav');
    const yearContainer = document.getElementById('year-container');
    const genreContainer = document.getElementById('genre-container');
    const alphabetContainer = document.getElementById('alphabet-container');
    const ratingContainer = document.getElementById('rating-container');
    const castContainer = document.getElementById('cast-container');
    const moviesGrid = document.getElementById('movies-grid');
    const mainContentArea = document.getElementById('main-content-area');
    const categoryView = document.getElementById('category-view');
    const filteredView = document.getElementById('filtered-view');
    const searchBar = document.getElementById('search-bar');
    const noResultsDiv = document.getElementById('no-results');
    const detailsModal = document.getElementById('movie-details-modal');
    const modalContentWrapper = document.getElementById('modal-content-wrapper');
    const addMovieModal = document.getElementById('add-movie-modal');
    const addMovieForm = document.getElementById('add-movie-form');
    const addMovieModalCloseBtn = document.getElementById('add-movie-modal-close-btn');
    const categorySelect = addMovieForm.querySelector('select[name="category"]');
    const genreSelect = addMovieForm.querySelector('select[name="genres"]');
    const downloadLinksContainer = document.getElementById('download-links-container');
    const addDownloadLinkBtn = document.getElementById('add-download-link-btn');
    const requestMovieBtn = document.getElementById('request-movie-btn');
    const requestMovieModal = document.getElementById('request-movie-modal');
    const requestModalCloseBtn = document.getElementById('request-modal-close-btn');
    const requestMovieForm = document.getElementById('request-movie-form');
    const viewRequestsModal = document.getElementById('view-requests-modal');
    const viewRequestsModalCloseBtn = document.getElementById('view-requests-modal-close-btn');
    const requestsList = document.getElementById('requests-list');
    const clearRequestsBtn = document.getElementById('clear-requests-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const editSocialsModal = document.getElementById('edit-socials-modal');
    const editSocialsModalCloseBtn = document.getElementById('edit-socials-modal-close-btn');
    const editSocialsForm = document.getElementById('edit-socials-form');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const addSocialLinkBtn = document.getElementById('add-social-link-btn');
    const socialLinksInputsContainer = document.getElementById('social-links-inputs-container');
    const headerTitle = document.getElementById('header-title');
    const editAdsModal = document.getElementById('edit-ads-modal');
    const editAdsForm = document.getElementById('edit-ads-form');
    const editAdsModalCloseBtn = document.getElementById('edit-ads-modal-close-btn');
    const backToTopBtn = document.getElementById('back-to-top');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavContent = document.getElementById('mobile-nav-content');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const leftSidebar = document.getElementById('left-sidebar');
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const featuredSlider = document.getElementById('featured-slider');
    const featuredPrevBtn = document.getElementById('featured-prev');
    const featuredNextBtn = document.getElementById('featured-next');
    const adminPanelBtn = document.getElementById('admin-panel-btn');
    const adminPanelModal = document.getElementById('admin-panel-modal');
    const adminPanelModalCloseBtn = document.getElementById('admin-panel-modal-close-btn');
    const editFeaturedModal = document.getElementById('edit-featured-modal');
    const editFeaturedModalCloseBtn = document.getElementById('edit-featured-modal-close-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const manageAdminsModal = document.getElementById('manage-admins-modal');
    const manageAdminsModalCloseBtn = document.getElementById('manage-admins-modal-close-btn');
    const addAdminForm = document.getElementById('add-admin-form');
    const adminListContainer = document.getElementById('admin-list');
    const backBtn = document.getElementById('back-btn');
    const notificationModal = document.getElementById('notification-modal');
    const notificationMessage = document.getElementById('notification-message');
    const notificationCloseBtn = document.getElementById('notification-close-btn');
    const loginBtnHeader = document.getElementById('login-btn-header');
    const loginModal = document.getElementById('login-modal');
    const loginModalCloseBtn = document.getElementById('login-modal-close-btn');
    const footerTitle = document.getElementById('footer-title');

    // --- FUNCTIONS ---
    function updateHistory(state) {
        viewHistory.push(state);
        backBtn.classList.toggle('hidden', viewHistory.length <= 1);
    }

    function goBack() {
        if (viewHistory.length > 1) {
            viewHistory.pop(); // Remove current view
            const previousState = viewHistory[viewHistory.length - 1]; // Get previous
            renderState(previousState);
            backBtn.classList.toggle('hidden', viewHistory.length <= 1);
        }
    }

    function renderState(state) {
        if (state.type === 'homepage') {
            displayHomepageByCategory(false);
        } else if (state.type === 'category') {
            showFullCategory(state.categoryKey, false);
        } else if (state.type === 'filter') {
            applyFilters(false);
        }
    }

    function buildAndBindMobileMenu() {
        const categories = mockApiData.categories;
        const menuStructure = {
            "Movies": ['english_movies', 'hindi_movies', 'south_indian_movies', 'south_hindi_dubbed', 'bangla_movies', 'kolkata_bangla_movies', 'foreign_language_movies', 'animated_movies'],
            "Series": ['english_tv_series', 'bengali_tv_series', 'hindi_tv_series', 'korean_tv_series', 'cartoon_tv_series'],
            "Games": ['pc_games', 'android_games', 'console_games'],
            "More": ['documentary_cat', 'award_shows', 'wrestling', 'software', 'tutorials']
        };

        let navHtml = '';
        // Create simple links for categories
        for (const menuTitle in menuStructure) {
            navHtml += `<h3 class="text-gray-500 text-sm font-bold uppercase tracking-wider mt-4 mb-2">${menuTitle}</h3>`;
            menuStructure[menuTitle].forEach(catKey => {
                if (categories[catKey]) {
                    navHtml += `<a href="#" class="block py-2 text-lg mobile-nav-link" data-category="${catKey}">${categories[catKey]}</a>`;
                }
            });
        }

        navHtml += `<div class="border-t border-gray-700 my-4"></div>`;

        // Add action buttons based on visibility in the header
        if (admins.includes(localStorage.getItem('currentUser'))) {
            navHtml += `<button id="mobile-admin-panel-btn" class="w-full text-left py-2 text-lg text-white hover:bg-neutral-700 rounded-md px-2">Admin Panel</button>`;
        }
        if (!requestMovieBtn.classList.contains('hidden')) {
            navHtml += `<button id="mobile-request-movie-btn" class="w-full text-left py-2 text-lg text-white hover:bg-neutral-700 rounded-md px-2">Request a Movie</button>`;
        }
        navHtml += `<button id="mobile-log-out" class="w-full text-left py-2 text-lg text-white hover:bg-neutral-700 rounded-md px-2">Logout</button>`;
        
        navHtml += `<div class="border-t border-gray-700 my-4"></div>`;
        
        // Add theme toggle
        navHtml += `
            <div class="flex items-center justify-between px-2">
                <span class="text-lg text-white">Theme</span>
                <button id="mobile-theme-toggle-btn" class="p-2 rounded-full text-gray-400">
                    <svg id="mobile-theme-icon-light" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <svg id="mobile-theme-icon-dark" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </button>
            </div>
        `;


        mobileNavContent.innerHTML = navHtml;

        // --- BIND EVENTS FOR MOBILE MENU ---
        
        // Navigation links
        mobileNavContent.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                showFullCategory(category);
                mobileMenu.classList.add('hidden');
            });
        });

        // Action buttons
        const mobileAdminPanelBtn = document.getElementById('mobile-admin-panel-btn');
        if (mobileAdminPanelBtn) mobileAdminPanelBtn.addEventListener('click', () => { adminPanelBtn.click(); mobileMenu.classList.add('hidden'); });

        const mobileRequestMovieBtn = document.getElementById('mobile-request-movie-btn');
        if (mobileRequestMovieBtn) mobileRequestMovieBtn.addEventListener('click', () => { requestMovieBtn.click(); mobileMenu.classList.add('hidden'); });
        
        const mobileLogoutBtn = document.getElementById('mobile-log-out');
        if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', () => { document.getElementById('log-out').click(); });

        // Theme toggle
        const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
        if(mobileThemeToggleBtn) {
            const mobileIconLight = document.getElementById('mobile-theme-icon-light');
            const mobileIconDark = document.getElementById('mobile-theme-icon-dark');
            
            const updateMobileIcons = () => {
                const currentTheme = localStorage.getItem('theme') || 'dark';
                 if (document.documentElement.classList.contains('dark')) {
                    mobileIconLight.classList.add('hidden');
                    mobileIconDark.classList.remove('hidden');
                } else {
                    mobileIconDark.classList.add('hidden');
                    mobileIconLight.classList.remove('hidden');
                }
            };
            
            mobileThemeToggleBtn.addEventListener('click', () => {
                themeToggleBtn.click(); // Trigger the main theme toggle
                updateMobileIcons();
            });
            
            updateMobileIcons(); // Set initial state
        }
    }
    
    function createMovieCard(movie) {
        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/1f2937/374151?text=No+Image';
        return `
            <div class="movie-card rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer" onclick="showMovieDetails(${movie.id})">
                <img loading="lazy" src="${posterUrl}" alt="${movie.title}" class="w-full h-auto object-cover" onerror="this.onerror=null;this.src='https://placehold.co/500x750/1f2937/374151?text=No+Image';">
                <div class="p-3">
                    <h3 class="font-bold text-sm truncate">${movie.title}</h3>
                    <p class="text-xs truncate mt-1">${movie.genres ? movie.genres.join(', ') : ''}</p>
                    <div class="flex justify-between items-center mt-1">
                        <p class="text-xs">${movie.release_year}</p>
                        <p class="text-xs text-amber-400 font-semibold">★ ${movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    function displayMovies(movies) {
        movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        moviesGrid.innerHTML = '';
        if (!movies || movies.length === 0) {
            noResultsDiv.style.display = 'flex';
        } else {
            noResultsDiv.style.display = 'none';
            moviesGrid.innerHTML = movies.map(createMovieCard).join('');
        }
    }

    function showFullCategory(categoryKey, saveToHistory = true) {
        categoryView.classList.add('hidden');
        filteredView.classList.remove('hidden');
        displayMovies(mockApiData.movies[categoryKey] || []);
        if (saveToHistory) {
            updateHistory({ type: 'category', categoryKey: categoryKey });
        }
    }
    
    function displayHomepageByCategory(saveToHistory = true) {
        filteredView.classList.add('hidden');
        categoryView.classList.remove('hidden');
        categoryView.innerHTML = '';

        const categoriesToDisplay = Object.keys(mockApiData.categories);

        categoriesToDisplay.forEach(catKey => {
            const movies = mockApiData.movies[catKey] || [];
            if (movies.length > 0) {
                const sortedMovies = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
                const top12Movies = sortedMovies.slice(0, 12);

                const section = document.createElement('section');
                section.innerHTML = `
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">${mockApiData.categories[catKey]}</h2>
                        <button class="see-more-link bg-red-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-red-700 transition-colors" data-category="${catKey}">SEE ALL</button>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                        ${top12Movies.map(createMovieCard).join('')}
                    </div>
                `;
                categoryView.appendChild(section);
            }
        });

        document.querySelectorAll('.see-more-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryKey = e.target.dataset.category;
                showFullCategory(categoryKey);
            });
        });

        if (saveToHistory) {
            viewHistory = [{ type: 'homepage' }];
            backBtn.classList.add('hidden');
        }
    }
    
    function buildNavMenu() {
        const categories = mockApiData.categories;
        const menuStructure = {
            "Movies": ['english_movies', 'hindi_movies', 'south_indian_movies', 'south_hindi_dubbed', 'bangla_movies', 'kolkata_bangla_movies', 'foreign_language_movies', 'animated_movies'],
            "Series": ['english_tv_series', 'bengali_tv_series', 'hindi_tv_series', 'korean_tv_series', 'cartoon_tv_series'],
            "Games": ['pc_games', 'android_games', 'console_games'],
            "More": ['documentary_cat', 'award_shows', 'wrestling', 'software', 'tutorials']
        };

        let navHtml = '';
        for (const menuTitle in menuStructure) {
            navHtml += `
                <div class="relative dropdown-group">
                    <button class="nav-link px-4 py-2 rounded-full transition-colors flex items-center gap-1">
                        ${menuTitle}
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div class="dropdown-menu absolute left-0 mt-2 w-56 rounded-md shadow-lg py-1 z-50 hidden">
            `;
            menuStructure[menuTitle].forEach(catKey => {
                if (categories[catKey]) {
                    navHtml += `<a href="#" class="block px-4 py-2 text-sm nav-link" data-category="${catKey}">${categories[catKey]}</a>`;
                }
            });
            navHtml += `</div></div>`;
        }
        mainNav.innerHTML = navHtml;

        // Add event listeners for hover-based dropdowns
         document.querySelectorAll('.dropdown-group').forEach(group => {
            const menu = group.querySelector('.dropdown-menu');
            let timeoutId;
            
            group.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
                menu.classList.remove('hidden');
            });

            group.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                   menu.classList.add('hidden');
                }, 100);
            });

            menu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    document.querySelectorAll('.nav-link, #main-nav button').forEach(btn => btn.classList.remove('active-btn'));
                    group.querySelector('button').classList.add('active-btn');
                    const category = e.target.dataset.category;
                    showFullCategory(category);
                    menu.classList.add('hidden');
                }
            });
        });
    }
    
    function displayYears() {
        const yearContainer = document.getElementById('year-container');
        yearContainer.innerHTML = '';
        for (let year = 2025; year >= 1995; year--) {
            const yearButton = document.createElement('button');
            yearButton.className = 'year-btn w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm';
            yearButton.textContent = year;
            yearButton.dataset.year = year;
            yearContainer.appendChild(yearButton);
        }
        
        document.querySelectorAll('#year-container .year-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('#year-container .year-btn').forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                selectedYear = parseInt(button.dataset.year);
                applyFilters();
            });
        });
    }

    function displayGenres() {
        const genreContainer = document.getElementById('genre-container');
        const genreSelect = document.getElementById('genre-select');
        const genres = mockApiData.genres;
        const sortedGenreKeys = Object.keys(genres).sort((a,b) => genres[a].localeCompare(genres[b]));

        genreContainer.innerHTML = sortedGenreKeys.map(key => `
            <button class="genre-btn w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm" data-genre="${genres[key]}">
                ${genres[key]}
            </button>
        `).join('');

        genreSelect.innerHTML = sortedGenreKeys.map(key => `<option value="${genres[key]}">${genres[key]}</option>`).join('');

        document.querySelectorAll('#genre-container .genre-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('#genre-container .genre-btn').forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                selectedGenre = button.dataset.genre;
                applyFilters();
            });
        });
    }

    function displayAlphabetFilter() {
        const alphabetContainer = document.getElementById('alphabet-container');
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        alphabetContainer.innerHTML = alphabet.map(letter => `
            <button class="alphabet-btn p-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm" data-letter="${letter}">
                ${letter}
            </button>
        `).join('');

        document.querySelectorAll('.alphabet-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.alphabet-btn').forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                selectedLetter = button.dataset.letter;
                applyFilters();
            });
        });
    }

    function displayRatingFilter() {
        const ratingContainer = document.getElementById('rating-container');
        const ratings = [9, 8, 7, 6, 5]; // Ratings thresholds
        ratingContainer.innerHTML = ratings.map(rating => `
            <button class="rating-btn w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm" data-rating="${rating}">
                ★ ${rating}+ Stars
            </button>
        `).join('');

        document.querySelectorAll('.rating-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.rating-btn').forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                selectedRating = parseFloat(button.dataset.rating);
                applyFilters();
            });
        });
    }

    function displayCastFilter() {
        const castContainer = document.getElementById('cast-container');
        const allMovies = Object.values(mockApiData.movies).flat();
        const allCast = new Set();
        allMovies.forEach(movie => {
            if (movie.cast) {
                movie.cast.split(',').forEach(actor => allCast.add(actor.trim()));
            }
        });

        const sortedCast = Array.from(allCast).sort();
        castContainer.innerHTML = sortedCast.map(actor => `
            <button class="cast-btn w-full text-left px-3 py-2 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm" data-cast="${actor}">
                ${actor}
            </button>
        `).join('');

        document.querySelectorAll('#cast-container .cast-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('#cast-container .cast-btn').forEach(btn => btn.classList.remove('active-btn'));
                button.classList.add('active-btn');
                selectedCast = button.dataset.cast;
                applyFilters();
            });
        });
    }

    function applyFilters(saveToHistory = true) {
        categoryView.classList.add('hidden');
        filteredView.classList.remove('hidden');

        let allMovies = Object.values(mockApiData.movies).flat();
        let uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
        let filteredMovies = uniqueMovies;
        const searchTerm = searchBar.value.toLowerCase().trim();

        if (selectedGenre) {
            filteredMovies = filteredMovies.filter(movie => movie.genres && movie.genres.includes(selectedGenre));
        }
        if (selectedYear) {
            filteredMovies = filteredMovies.filter(movie => movie.release_year === selectedYear);
        }
        if (selectedLetter) {
            filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().startsWith(selectedLetter.toLowerCase()));
        }
        if (selectedRating) {
            filteredMovies = filteredMovies.filter(movie => movie.vote_average >= selectedRating);
        }
        if (selectedCast) {
            filteredMovies = filteredMovies.filter(movie => movie.cast && movie.cast.toLowerCase().includes(selectedCast.toLowerCase()));
        }

        if (searchTerm) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.release_year.toString().includes(searchTerm)
            );
        }
        
        // When any filter is applied, clear the top nav active state
        if (selectedGenre || selectedYear || selectedLetter || selectedRating || selectedCast) {
            document.querySelectorAll('.nav-link, #main-nav button').forEach(btn => btn.classList.remove('active-btn'));
        }

        displayMovies(filteredMovies);
        if (saveToHistory) {
            updateHistory({ type: 'filter' });
        }
    }
    
    function handleSearch() {
        applyFilters();
    }
    
    function handleSaveContent(event) {
        event.preventDefault();
        const form = event.target;
        const mode = form.dataset.mode || 'add';
        const formData = new FormData(form);
        const genres = Array.from(form.querySelector('select[name="genres"]').selectedOptions).map(option => option.value);

        const downloadLinks = [];
        const linkInputs = document.getElementById('download-links-container').querySelectorAll('.download-link-group');
        linkInputs.forEach((group, index) => {
            const name = group.querySelector(`input[name^="download_name"]`).value.trim();
            const url = group.querySelector(`input[name^="download_url"]`).value.trim();
            const size = group.querySelector(`input[name^="download_size"]`).value.trim();
            if (name && url) {
                downloadLinks.push({ name, url, size, clicks: 0 });
            }
        });
        
        const day = formData.get('release_day');
        const month = formData.get('release_month');
        const year = formData.get('release_year');
        const releaseDate = (year && month && day) ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : '';

        const movieData = {
            title: formData.get('title'),
            release_year: parseInt(year),
            release_date: releaseDate,
            poster_path: formData.get('poster_path'),
            trailer_url: formData.get('trailer_url'),
            stream_url: formData.get('stream_url'),
            vote_average: parseFloat(formData.get('vote_average')),
            overview: formData.get('overview'),
            genres: genres,
            download_links: downloadLinks,
            director: formData.get('director'),
            runningTime: formData.get('runningTime'),
            budget: formData.get('budget'),
            cast: formData.get('cast'),
        };

        if (mode === 'edit') {
            const movieIdToEdit = parseInt(form.dataset.movieIdToEdit);
            let movieFound = false;
            // Find and update the movie
            for (const category in mockApiData.movies) {
                const movieIndex = mockApiData.movies[category].findIndex(m => m.id === movieIdToEdit);
                if (movieIndex !== -1) {
                    // Preserve original ID, comments and click counts
                    const originalMovie = mockApiData.movies[category][movieIndex];
                    const updatedLinks = movieData.download_links.map(newLink => {
                        const oldLink = originalMovie.download_links.find(l => l.name === newLink.name);
                        return { ...newLink, clicks: oldLink ? oldLink.clicks : 0 };
                    });

                    mockApiData.movies[category][movieIndex] = { ...originalMovie, ...movieData, download_links: updatedLinks };
                    movieFound = true;
                    break;
                }
            }
            if (!movieFound) {
                console.error("Could not find movie to edit!");
                return;
            }
            showNotification('Content updated successfully!');

        } else { // 'add' mode
            const newMovie = {
                ...movieData,
                id: Date.now(),
                comments: []
            };
            const category = formData.get('category');
            if (mockApiData.movies[category]) {
                mockApiData.movies[category].unshift(newMovie);
            } else {
                mockApiData.movies[category] = [newMovie];
            }
            showNotification('Content added successfully!');
        }
        
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));

        // Reset form and close modal
        form.reset();
        form.dataset.mode = 'add';
        form.querySelector('button[type="submit"]').textContent = 'Add Content';
        closeModal('add-movie-modal');
        
        // Refresh the view
        displayHomepageByCategory();
        displayCastFilter();
    }

    function handleMovieRequest(event) {
        event.preventDefault();
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            showNotification('You must be logged in to make a request.');
            return;
        }

        const formData = new FormData(requestMovieForm);
        const movieRequest = {
            name: formData.get('movieName'),
            year: formData.get('movieYear'),
            description: formData.get('movieDescription'),
            requester: currentUser
        };

        let requests = JSON.parse(localStorage.getItem('movieRequests')) || [];
        requests.push(movieRequest);
        localStorage.setItem('movieRequests', JSON.stringify(requests));

        showNotification('Your request has been submitted to the admin!');
        requestMovieForm.reset();
        closeModal('request-movie-modal');
    }

    function checkForMovieRequests() {
        const adminPanelNotificationBadge = document.getElementById('admin-panel-notification-badge');
        const modalRequestNotificationBadge = document.getElementById('modal-request-notification-badge');
        const requests = JSON.parse(localStorage.getItem('movieRequests')) || [];
        const count = requests.length;

        if (count > 0) {
            if (adminPanelNotificationBadge) {
                adminPanelNotificationBadge.textContent = count;
                adminPanelNotificationBadge.classList.remove('hidden');
            }
            if (modalRequestNotificationBadge) {
                modalRequestNotificationBadge.textContent = count;
                modalRequestNotificationBadge.classList.remove('hidden');
            }
        } else {
            if (adminPanelNotificationBadge) {
                adminPanelNotificationBadge.classList.add('hidden');
            }
            if (modalRequestNotificationBadge) {
                modalRequestNotificationBadge.classList.add('hidden');
            }
        }
    }

    function showRequests() {
        const requests = JSON.parse(localStorage.getItem('movieRequests')) || [];
        if (requests.length === 0) {
            requestsList.innerHTML = `<p class="text-gray-400">No pending movie requests.</p>`;
        } else {
            requestsList.innerHTML = requests.map(req => `
                <div class="bg-neutral-700 p-4 rounded-lg">
                    <p><strong>Movie:</strong> ${req.name}</p>
                    <p><strong>Year:</strong> ${req.year || 'N/A'}</p>
                    <p><strong>Description:</strong> ${req.description || 'N/A'}</p>
                    <p class="text-xs text-gray-400 mt-2">Requested by: ${req.requester}</p>
                </div>
            `).join('');
        }
        viewRequestsModal.classList.remove('hidden');
        setTimeout(() => viewRequestsModal.querySelector('.transform').classList.remove('scale-95'), 10);
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            themeIconDark.classList.add('hidden');
            themeIconLight.classList.remove('hidden');
        }
    }

    function handleUpdateSocials(event) {
        event.preventDefault();
        const newSocialLinks = {};
        const inputs = socialLinksInputsContainer.querySelectorAll('.social-link-group');
        inputs.forEach(group => {
            const name = group.querySelector('input[data-type="name"]').value.trim();
            const url = group.querySelector('input[data-type="url"]').value.trim();
            if (name && url) {
                newSocialLinks[name.toLowerCase()] = url;
            }
        });

        mockApiData.socialLinks = newSocialLinks;
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
        displaySocialIcons('social-icons-container');
        displaySocialIcons('floating-socials-container');
        closeModal('edit-socials-modal');
        showNotification('Social links updated!');
    }

    function handleUpdateAds(event) {
        event.preventDefault();
        const formData = new FormData(editAdsForm);
        mockApiData.ads = {
            adLeft1: formData.get('adLeft1'),
            adLeftImg1: formData.get('adLeftImg1'),
            adLeftImg2: formData.get('adLeftImg2'),
            adLeftImg3: formData.get('adLeftImg3'),
            adLeftImg4: formData.get('adLeftImg4'),
            sidebarVideo: formData.get('sidebarVideo'),
            right1: formData.get('right1'),
            right2: formData.get('right2'),
            rightNative: formData.get('rightNative'),
            rightImg1: formData.get('rightImg1'),
            rightImg2: formData.get('rightImg2'),
            rightImg3: formData.get('rightImg3'),
            right468x60: formData.get('right468x60'),
            right320x50: formData.get('right320x50'),
            adSocialBar: formData.get('adSocialBar'),
            adPopunder: formData.get('adPopunder'),
            adFooter728x90: formData.get('adFooter728x90'),
        };
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
        displayAds();
        closeModal('edit-ads-modal');
        showNotification('Ad codes updated successfully!');
    }
    
    function displayFeaturedMovies() {
        const featuredIds = mockApiData.featuredIds || [];
        const featuredMovies = featuredIds.map(id => findMovieById(id)).filter(Boolean); // Get movie objects and remove nulls
        
        featuredSlider.innerHTML = featuredMovies.map(movie => {
             const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : 'https://placehold.co/780x439/1f2937/374151?text=No+Image';
            return `
                <div class="snap-center flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                    <div class="featured-movie-card" style="background-image: url('${posterUrl}')" onclick="showMovieDetails(${movie.id})">
                         <div class="content">
                            <h3 class="text-white font-bold text-lg truncate">${movie.title}</h3>
                            <p class="text-white text-sm truncate">${movie.genres ? movie.genres.join(', ') : ''}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        startFeaturedSlider();
    }

    function startFeaturedSlider() {
        clearInterval(featuredScrollInterval);
        featuredScrollInterval = setInterval(() => {
            const scrollWidth = featuredSlider.scrollWidth;
            const clientWidth = featuredSlider.clientWidth;
            if (featuredSlider.scrollLeft + clientWidth >= scrollWidth) {
                featuredSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                featuredSlider.scrollBy({ left: clientWidth, behavior: 'smooth' });
            }
        }, 3000);
    }

    function renderCurrentFeaturedList() {
        const listContainer = document.getElementById('current-featured-list');
        const featuredIds = mockApiData.featuredIds || [];
        const featuredMovies = featuredIds.map(id => findMovieById(id)).filter(Boolean);

        if (featuredMovies.length === 0) {
            listContainer.innerHTML = '<p class="text-gray-400">No featured items yet.</p>';
            return;
        }

        listContainer.innerHTML = featuredMovies.map(movie => `
            <div class="flex items-center justify-between bg-neutral-700 p-2 rounded-md">
                <span>${movie.title}</span>
                <button onclick="removeFeaturedItem(${movie.id})" class="text-red-500 hover:text-red-400 text-sm font-bold">Remove</button>
            </div>
        `).join('');
    }

    window.removeFeaturedItem = function(movieId) {
        mockApiData.featuredIds = mockApiData.featuredIds.filter(id => id !== movieId);
        localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
        renderCurrentFeaturedList();
        displayFeaturedMovies();
    }

    function showAdminManagementModal() {
        closeModal('admin-panel-modal');
        renderAdminList();
        manageAdminsModal.classList.remove('hidden');
        setTimeout(() => manageAdminsModal.querySelector('.transform').classList.remove('scale-95'), 10);
    }

    function renderAdminList() {
        adminListContainer.innerHTML = admins.map(adminName => `
            <div class="flex items-center justify-between bg-neutral-700 p-2 rounded-md">
                <span>${adminName}</span>
                ${adminName !== 'rpranta' ? `<button onclick="removeAdmin('${adminName}')" class="text-red-500 hover:text-red-400 text-sm font-bold">Remove</button>` : ''}
            </div>
        `).join('');
    }

    function addAdmin(event) {
        event.preventDefault();
        const errorP = document.getElementById('add-admin-error');
        const username = addAdminForm.querySelector('input[name="username"]').value.trim().toLowerCase();
        
        if (!username) return;

        if (admins.includes(username)) {
            errorP.textContent = `"${username}" is already an admin.`;
            errorP.classList.remove('hidden');
            return;
        }

        if (!users.find(user => user.name.toLowerCase() === username)) {
            errorP.textContent = `User "${username}" does not exist.`;
            errorP.classList.remove('hidden');
            return;
        }

        admins.push(username);
        saveUsers();
        renderAdminList();
        addAdminForm.reset();
        errorP.classList.add('hidden');
        showNotification(`User "${username}" has been promoted to admin.`);
    }

    window.removeAdmin = function(username) {
        if (username === 'rpranta') {
            showNotification('The primary admin cannot be removed.');
            return;
        }
        if (confirm(`Are you sure you want to remove "${username}" as an admin?`)) {
            admins = admins.filter(admin => admin !== username);
            saveUsers();
            renderAdminList();
        }
    }

    function showNotification(message) {
        notificationMessage.textContent = message;
        notificationModal.classList.remove('hidden');
        setTimeout(() => notificationModal.querySelector('.transform').classList.remove('scale-95'), 10);
    }
    
    function togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;
        const button = input.nextElementSibling;
        const icon = button.querySelector('svg');
        if (input.type === "password") {
            input.type = "text";
            icon.innerHTML = `<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />`;
        } else {
            input.type = "password";
            icon.innerHTML = `<path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2 2 0 012.828 2.828l1.515 1.515A4 4 0 0014 10a4 4 0 10-5.93 3.93l-1.515-1.515a2 2 0 01-2.828-2.828zM10 17a9.958 9.958 0 01-4.512-1.074l-1.78-1.781a1 1 0 01-1.414-1.414l14-14a1 1 0 011.414 1.414l-1.473 1.473A10.014 10.014 0 01.458 10C1.732 14.057 5.522 17 10 17z" clip-rule="evenodd" />`;
        }
    }
    window.togglePasswordVisibility = togglePasswordVisibility;


    // --- EVENT LISTENERS ---
    updateHeaderState();
    buildNavMenu();
    displayYears();
    displayGenres();
    displayAlphabetFilter();
    displayRatingFilter();
    displayCastFilter();
    displayFeaturedMovies();
    displaySocialIcons('floating-social-bar');
    displayAds();
    displayHomepageByCategory();
    initializeLoginModal();
    
    const resetHomepage = () => {
        displayHomepageByCategory();
    };

    clearFiltersBtn.addEventListener('click', resetHomepage);
    headerTitle.addEventListener('click', resetHomepage);
    footerTitle.addEventListener('click', resetHomepage);
    backBtn.addEventListener('click', goBack);
    
    document.getElementById('log-out').addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        updateHeaderState();
    });

    loginBtnHeader.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
        setTimeout(() => loginModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    loginModalCloseBtn.addEventListener('click', () => closeModal('login-modal'));

    searchBar.addEventListener('input', handleSearch);

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) closeModal('movie-details-modal');
    });
    
    adminPanelBtn.addEventListener('click', () => {
        checkForMovieRequests(); // Update badge count when opening
        adminPanelModal.classList.remove('hidden');
        setTimeout(() => adminPanelModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    adminPanelModalCloseBtn.addEventListener('click', () => closeModal('admin-panel-modal'));
    
    document.getElementById('modal-add-movie-btn').addEventListener('click', () => {
        closeModal('admin-panel-modal');
        const addMovieForm = document.getElementById('add-movie-form');
        addMovieForm.reset();
        addMovieForm.dataset.mode = 'add';
        addMovieForm.querySelector('button[type="submit"]').textContent = 'Add Content';
        
        const downloadLinksContainer = document.getElementById('download-links-container');
        downloadLinksContainer.innerHTML = '';
        addDownloadLinkField();

        categorySelect.innerHTML = Object.keys(mockApiData.categories)
            .map(key => `<option value="${key}">${mockApiData.categories[key]}</option>`).join('');
        
        const daySelect = addMovieForm.querySelector('select[name="release_day"]');
        const monthSelect = addMovieForm.querySelector('select[name="release_month"]');
        const yearSelect = addMovieForm.querySelector('select[name="release_year"]');
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];


        daySelect.innerHTML = '<option value="">Day</option>' + Array.from({length: 31}, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('');
        monthSelect.innerHTML = '<option value="">Month</option>' + months.map((m, i) => `<option value="${i+1}">${m}</option>`).join('');
        yearSelect.innerHTML = '<option value="">Year</option>' + Array.from({length: 100}, (_, i) => `<option value="${new Date().getFullYear() - i}">${new Date().getFullYear() - i}</option>`).join('');

        addMovieModal.classList.remove('hidden');
        setTimeout(() => addMovieModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    
    document.getElementById('modal-edit-featured-btn').addEventListener('click', () => {
        closeModal('admin-panel-modal');
        renderCurrentFeaturedList();
        editFeaturedModal.classList.remove('hidden');
        setTimeout(() => editFeaturedModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    
    editFeaturedModalCloseBtn.addEventListener('click', () => closeModal('edit-featured-modal'));
    
    document.getElementById('featured-search-bar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const resultsContainer = document.getElementById('featured-search-results');
        if (searchTerm.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const allMovies = Object.values(mockApiData.movies).flat();
        const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
        const results = uniqueMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm)).slice(0, 10);

        resultsContainer.innerHTML = results.map(movie => `
            <div class="flex items-center justify-between p-2 hover:bg-neutral-700 rounded-md cursor-pointer" onclick="addFeaturedItem(${movie.id})">
                <span>${movie.title}</span>
                <button class="text-green-500 text-sm font-bold">Add</button>
            </div>
        `).join('');
    });

    window.addFeaturedItem = function(movieId) {
        if (!mockApiData.featuredIds.includes(movieId)) {
            mockApiData.featuredIds.push(movieId);
            localStorage.setItem('movieDatabase', JSON.stringify(mockApiData));
            renderCurrentFeaturedList();
            displayFeaturedMovies();
        }
        document.getElementById('featured-search-bar').value = '';
        document.getElementById('featured-search-results').innerHTML = '';
    }

    document.getElementById('modal-edit-socials-btn').addEventListener('click', () => {
        closeModal('admin-panel-modal');
        const editSocialsModal = document.getElementById('edit-socials-modal');
        const socialLinksInputsContainer = document.getElementById('social-links-inputs-container');
        const links = mockApiData.socialLinks || {};
        socialLinksInputsContainer.innerHTML = ''; // Clear previous inputs
        Object.entries(links).forEach(([name, url]) => {
            const linkGroup = document.createElement('div');
            linkGroup.className = 'social-link-group grid grid-cols-2 gap-2';
            linkGroup.innerHTML = `
                <input data-type="name" type="text" value="${name}" class="form-input w-full p-3 rounded-md focus:ring-red-500 focus:border-red-500">
                <input data-type="url" type="text" value="${url}" class="form-input w-full p-3 rounded-md focus:ring-red-500 focus:border-red-500">
            `;
            socialLinksInputsContainer.appendChild(linkGroup);
        });

        editSocialsModal.classList.remove('hidden');
        setTimeout(() => editSocialsModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    
    document.getElementById('modal-edit-ads-btn').addEventListener('click', () => {
        closeModal('admin-panel-modal');
        editAdsModal.classList.remove('hidden');
        setTimeout(() => editAdsModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });

    document.getElementById('modal-view-requests-btn').addEventListener('click', () => {
        closeModal('admin-panel-modal');
        showRequests();
    });

    document.getElementById('modal-manage-admins-btn').addEventListener('click', showAdminManagementModal);


    addDownloadLinkBtn.addEventListener('click', addDownloadLinkField);
    addMovieForm.addEventListener('submit', handleSaveContent);

    addMovieModalCloseBtn.addEventListener('click', () => closeModal('add-movie-modal'));
    addMovieModal.addEventListener('click', (e) => {
        if (e.target === addMovieModal) closeModal('add-movie-modal');
    });

    requestMovieBtn.addEventListener('click', () => {
         requestMovieModal.classList.remove('hidden');
         setTimeout(() => requestMovieModal.querySelector('.transform').classList.remove('scale-95'), 10);
    });
    requestModalCloseBtn.addEventListener('click', () => closeModal('request-movie-modal'));
    requestMovieModal.addEventListener('click', (e) => {
        if (e.target === requestMovieModal) closeModal('request-movie-modal');
    });
    requestMovieForm.addEventListener('submit', handleMovieRequest);

    viewRequestsModalCloseBtn.addEventListener('click', () => closeModal('view-requests-modal'));
    clearRequestsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all movie requests?')) {
            localStorage.removeItem('movieRequests');
            requestsList.innerHTML = `<p class="text-gray-400">No pending movie requests.</p>`;
            checkForMovieRequests();
        }
    });

    addSocialLinkBtn.addEventListener('click', () => {
        const newLinkGroup = document.createElement('div');
        newLinkGroup.className = 'social-link-group grid grid-cols-2 gap-2';
        newLinkGroup.innerHTML = `
            <input data-type="name" type="text" placeholder="Social Name (e.g. Instagram)" class="form-input w-full p-3 rounded-md focus:ring-red-500 focus:border-red-500">
            <input data-type="url" type="text" placeholder="URL" class="form-input w-full p-3 rounded-md focus:ring-red-500 focus:border-red-500">
        `;
        socialLinksInputsContainer.appendChild(newLinkGroup);
    });

    editSocialsModalCloseBtn.addEventListener('click', () => closeModal('edit-socials-modal'));
    editSocialsModal.addEventListener('click', (e) => {
        if (e.target === editSocialsModal) closeModal('edit-socials-modal');
    });
    editSocialsForm.addEventListener('submit', handleUpdateAds);
    editAdsModalCloseBtn.addEventListener('click', () => closeModal('edit-ads-modal'));
    editAdsForm.addEventListener('submit', handleUpdateAds);
    
    manageAdminsModalCloseBtn.addEventListener('click', () => closeModal('manage-admins-modal'));
    addAdminForm.addEventListener('submit', addAdmin);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    mobileMenuBtn.addEventListener('click', () => {
        buildAndBindMobileMenu();
        mobileMenu.classList.remove('hidden');
    });

    mobileMenuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    filterToggleBtn.addEventListener('click', () => {
        leftSidebar.classList.toggle('hidden');
    });
    
    featuredSlider.addEventListener('mouseenter', () => clearInterval(featuredScrollInterval));
    featuredSlider.addEventListener('mouseleave', startFeaturedSlider);

    featuredPrevBtn.addEventListener('click', () => {
        featuredSlider.scrollBy({ left: -featuredSlider.clientWidth, behavior: 'smooth' });
    });

    featuredNextBtn.addEventListener('click', () => {
        featuredSlider.scrollBy({ left: featuredSlider.clientWidth, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    notificationCloseBtn.addEventListener('click', () => {
        closeModal('notification-modal');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!detailsModal.classList.contains('hidden')) closeModal('movie-details-modal');
            if (!addMovieModal.classList.contains('hidden')) closeModal('add-movie-modal');
            if (!requestMovieModal.classList.contains('hidden')) closeModal('request-movie-modal');
            if (!viewRequestsModal.classList.contains('hidden')) closeModal('view-requests-modal');
            if (!editSocialsModal.classList.contains('hidden')) closeModal('edit-socials-modal');
            if (!editAdsModal.classList.contains('hidden')) closeModal('edit-ads-modal');
            if (!editFeaturedModal.classList.contains('hidden')) closeModal('edit-featured-modal');
            if (!manageAdminsModal.classList.contains('hidden')) closeModal('manage-admins-modal');
            if (!adminPanelModal.classList.contains('hidden')) closeModal('admin-panel-modal');
            if (!document.getElementById('trailer-modal').classList.contains('hidden')) closeModal('trailer-modal');
            if (!document.getElementById('stream-modal').classList.contains('hidden')) closeModal('stream-modal');
            if (!passwordResetModal.classList.contains('hidden')) closeModal('password-reset-modal');
            if (!notificationModal.classList.contains('hidden')) closeModal('notification-modal');
            if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
            if(!leftSidebar.classList.contains('hidden')) leftSidebar.classList.add('hidden');
        }
    });
    
     // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

}

document.addEventListener('DOMContentLoaded', () => {
    loadDatabase();
    document.getElementById('main-app').classList.remove('hidden');
    initializeMainApp();

    // Visitor Counter Logic
    displaySocialIcons('social-icons-container');
    const visitorCountSpan = document.getElementById('visitor-count-footer');
    let visitorData = JSON.parse(localStorage.getItem('visitorData')) || {};
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${today.getMonth()}`;

    if (visitorData.month !== currentMonth) {
        visitorData = {
            month: currentMonth,
            count: Math.floor(Math.random() * 500) + 1500 // Start with a random base
        };
    }
    
    visitorData.count++;
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
    if(visitorCountSpan) {
        visitorCountSpan.textContent = visitorData.count.toLocaleString();
    }
    
    updateUserCount();
});
