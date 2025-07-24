// --- DATABASE.JS ---
const initialData = {
    "featuredIds": [653346, 20250815250722, 20250623250722, 155, 20250331250722, 496243], // Default featured movies
    "ads": {
        "adLeft1": "", "adLeftImg1": "", "adLeftImg2": "", "adLeftImg3": "", "adLeftImg4": "", 
        "sidebarVideo": "https://youtu.be/2N53rKrNIig?si=gIsgDYYQpbPucn2q",
        "right1": "", "right2": "", "rightNative": "", 
        "rightImg1": "", "rightImg2": "", "rightImg3": "",
        "right468x60": "", "right320x50": "", "adSocialBar": "", "adPopunder": "", "adFooter728x90": ""
    },
    "socialLinks": {
        "facebook": "https://www.facebook.com/cinetorrentto",
        "telegram": "https://t.me/cinetorrentto",
        "youtube": "https://www.youtube.com/@panchaanukabyoofficial",
        "whatsapp": "https://wa.me/message/O7CPLSP7PN4DI1",
        "tiktok": "https://www.tiktok.com/@cinetorrentto"
    },
    "genres": {
        "action": "Action", "adventure": "Adventure", "animation": "Animation", "comedy": "Comedy", "crime": "Crime",
        "documentary": "Documentary", "drama": "Drama", "family": "Family", "fantasy": "Fantasy", "history": "History",
        "horror": "Horror", "music": "Music", "mystery": "Mystery", "romance": "Romance", "sci-fi": "Science Fiction",
        "tv-movie": "TV Movie", "thriller": "Thriller", "war": "War", "western": "Western"
    },
    "categories": {
        "english_movies": "English Movies", "hindi_movies": "Hindi Movies", "south_indian_movies": "South Indian Movies", "south_hindi_dubbed": "South Hindi Dubbed",
        "bangla_movies": "Bangla Movies", "kolkata_bangla_movies": "Kolkata Bangla Movies", "animated_movies": "Animated Movies", "foreign_language_movies": "Foreign Language Movies",
        "english_tv_series": "English TV & WEB Series", "bengali_tv_series": "Bengali TV & WEB Series", "hindi_tv_series": "Hindi TV & WEB Series", "korean_tv_series": "Korean TV & WEB Series", "cartoon_tv_series": "Cartoon TV & WEB Series",
        "pc_games": "PC Games", "android_games": "Android Games", "console_games": "Console Games",
        "documentary_cat": "Documentary", "award_shows": "Award & TV Shows", "wrestling": "WWE & AEW Wrestling", "software": "Software", "tutorials": "Tutorials & Trainings"
    },
    "movies": {
        "english_movies": [
            { "id": 653346, "title": "Kingdom of the Planet of the Apes", "release_year": 2024, "release_date": "2024-05-23", "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg", "vote_average": 7.2, "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.", "genres": ["Sci-Fi", "Adventure", "Action"], "trailer_url": "https://www.youtube.com/watch?v=XtFI7SNtVpY", "stream_url": "https://www.youtube.com/embed/XtFI7SNtVpY", "download_links": [{name: "1080p", url: "#", size: "2.1GB", clicks: 0}, {name: "720p", url: "#", size: "1.2GB", clicks: 0}], "director": "Wes Ball", "runningTime": "145 min", "budget": "$160 million", "cast": "Owen Teague, Freya Allan, Kevin Durand" },
            { "id": 823464, "title": "Godzilla x Kong: The New Empire", "release_year": 2024, "release_date": "2024-03-29", "poster_path": "/z1p34vh7dEOnLDmyCrl4vgYKbqX.jpg", "vote_average": 7.2, "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.", "genres": ["Action", "Sci-Fi", "Adventure"], "trailer_url": "https://www.youtube.com/watch?v=lV1OOlGwExM", "stream_url": "https://www.youtube.com/embed/lV1OOlGwExM", "download_links": [{name: "1080p", url: "#", size: "2.3GB", clicks: 0}, {name: "4K", url: "#", size: "5.5GB", clicks: 0}], "director": "Adam Wingard", "runningTime": "115 min", "budget": "$135 million", "cast": "Rebecca Hall, Brian Tyree Henry, Dan Stevens" },
            { "id": 278, "title": "The Shawshank Redemption", "release_year": 1994, "release_date": "1994-09-23", "poster_path": "/9O7gLzmBCUjxagC661LCL7tX3Vw.jpg", "vote_average": 8.7, "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.", "genres": ["Drama", "Crime"], "trailer_url": "https://www.youtube.com/watch?v=6hB3S9bIaco", "download_links": [{name: "1080p", url: "#", size: "2.0GB", clicks: 0}], "director": "Frank Darabont", "runningTime": "142 min", "budget": "$25 million", "cast": "Tim Robbins, Morgan Freeman, Bob Gunton" },
            { "id": 238, "title": "The Godfather", "release_year": 1972, "release_date": "1972-03-14", "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", "vote_average": 8.7, "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone, barely survives an attempt on his life, his youngest son, Michael, steps in to take care of the would-be killers, launching a campaign of bloody revenge.", "genres": ["Drama", "Crime"], "trailer_url": "https://www.youtube.com/watch?v=sY1S34973zA", "download_links": [{name: "1080p", url: "#", size: "2.5GB", clicks: 0}], "director": "Francis Ford Coppola", "runningTime": "175 min", "budget": "$6 million", "cast": "Marlon Brando, Al Pacino, James Caan" },
            { "id": 155, "title": "The Dark Knight", "release_year": 2008, "release_date": "2008-07-18", "poster_path": "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "vote_average": 8.5, "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.", "genres": ["Action", "Crime", "Drama"], "trailer_url": "https://www.youtube.com/watch?v=EXeTwQWrcwY", "download_links": [{name: "1080p", url: "#", size: "2.2GB", clicks: 0}], "director": "Christopher Nolan", "runningTime": "152 min", "budget": "$185 million", "cast": "Christian Bale, Heath Ledger, Aaron Eckhart" },
            { "id": 20250214, "title": "The Gorge", "release_year": 2025, "release_date": "2025-02-14", "poster_path": "https://drive.google.com/file/d/1iWSAaIfD9b898cdddgUQ3GmY9Uf1JqJ1/view?usp=drive_link","vote_average": 6.7, "overview": "Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.",
                "genres": ["Thriller", "Action", "Romance", "Horror"], "trailer_url": "https://www.youtube.com/watch?v=rUSdnuOLebE", "stream_url": "https://uflix.cc/play/tt13654226",
                "download_links": [{name: "1080p WEB-DL", url: "magnet:?xt=urn:btih:77A996EED3467566031B666868D568314EF8C226&dn=The+Gorge+2025+1080p+WEB-DL+HEVC+x265+5.1+BONE&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fr.l5.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2F&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker.gcrenwp.top%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.0x7c0.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fbandito.byterunner.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fevan.im%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce", size: "1.9 GB", clicks: 0},
 {name: "1080p.WEBRip", url: "magnet:?xt=urn:btih:7CA4723ECD4EEEFF6F95E454A1EF4F1A322C6631&dn=The.Gorge.2025.1080p.WEBRip.10Bit.DDP5.1.x265-Asiimov&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce", size: "1.9GB", clicks: 0}], "director": "Scott Derrickson", "runningTime": "127 min", "budget": "$70 million", "cast": "Miles Teller, Anya Taylor-Joy, Sigourney Weaver " },
        {
    "id": 20250623250722,
    "title": "How to Train Your Dragon",
    "release_year": 2025,
    "release_date": "2025-06-13",
    "poster_path": "https://drive.google.com/file/d/1I0tQSQ7_VSWPGwnP9Q-SgwiI7JxALDqB/view?usp=drive_link",
    "vote_average": 7.7,
    "overview": "On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.",
    "genres": [
        "Fantasy",
        "Adventure",
        "Family",
        "Action"
    ],
    "trailer_url": "https://youtu.be/22w7z_lT6YM?si=CZXXxSEm3wLI5eom",
    "stream_url": "https://uflix.cc/play/tt26743210",
    "download_links": [
        {
            "name": "1080p.WEB-DL",
            "url": "magnet:?xt=urn:btih:C11DFC5E344AE4508028EBE760BBBF44E2A42211&dn=How.to.Train.Your.Dragon.2025.1080p.WEB-DL.DDP5.1.x265-NeoNoir&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.ololosh.space%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Fretracker01-msk-virt.corbina.net%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.free-tracker.ga%3A6969%2Fannounce&tr=udp%3A%2F%2Fns-1.x-fins.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.9 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEBRip hindi",
            "url": "magnet:?xt=urn:btih:C5AD3F732B3D98235163539331D655E1669E101F&dn=How.to.Train.Your.Dragon.2025.1080p.DS4K.10bit.iTunes.WEBRip.Org.Hindi.DDP5.1-English.DDP5.1.Atmos.HEVC.ESub-DaddyCooL&tr=udp%3A%2F%2Ftracker.ololosh.space%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker01-msk-virt.corbina.net%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.theoks.net%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ft.overflow.biz%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fwepzone.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.tryhackx.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.filemail.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "4.3 GB",
            "clicks": 0
        },
        {
            "name": "1080p.WEB-DL",
            "url": "magnet:?xt=urn:btih:F553A7795756A9B849785D638CFFDF35E87E16F4&dn=How.to.Train.Your.Dragon.2025.1080p.WEB-DL.DDP5.1.H264-AOC&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "8.5 GB",
            "clicks": 0
        },
        {
            "name": "2160p H265 UHD",
            "url": "magnet:?xt=urn:btih:D0CCDB0C0A4824B4B0A51D94B6BE22DB071A3F0E&dn=How+to+Train+Your+Dragon+%282025%29+2160p+H265+HDR10+DV+iTA+EnG+AC3+Sub+EnG-MIRCrew&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker.lilithraws.org%3A443%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fmartin-gebhardt.eu%3A25%2Fannounce&tr=udp%3A%2F%2Ftracker.yume-hatsuyuki.moe%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.darkness.services%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Ftr4ck3r.duckdns.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "4.8 GB",
            "clicks": 0
        },
        {
            "name": "2160p.WEB-DL",
            "url": "magnet:?xt=urn:btih:FF917F48A575A350C3EBE191D4B28A861F0C0B0B&dn=How.to.Train.Your.Dragon.2025.Hybrid.2160p.WEB-DL.DV.HDR.DDP5.1.Atmos.H265-AOC&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "22.3 GB",
            "clicks": 0
        },
        {
            "name": "1080p.WEBRip",
            "url": "magnet:?xt=urn:btih:2B9C38FEE953806F02EF56DF57654E140BC25B5D&dn=How.to.Train.Your.Dragon.2025.1080p.WEBRip.AAC5.1.10bits.x265-Rapta&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fuploads.gamecoast.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker1.bt.moack.co.kr%3A80%2Fannounce&tr=udp%3A%2F%2Fmovies.zsw.ca%3A6969%2Fannounce&tr=https%3A%2F%2Ftr.burnabyhighstar.com%3A443%2Fannounce&tr=http%3A%2F%2Fopen.acgnxtracker.com%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "2.1 GB",
            "clicks": 0
        },
        {
            "name": "720p h264",
            "url": "magnet:?xt=urn:btih:7E2C965D9F90944344B249CEA82928E3CA445D9A&dn=How+to+Train+Your+Dragon++%282025%29+720p+h264+Ac3+5.1+Ita+Eng+Sub+Eng-MIRCrew&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.bittor.pw%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "2.3 GB",
            "clicks": 0
        }
    ],
    "director": "Dean DeBlois",
    "runningTime": "125 min",
    "budget": "$150 million",
    "cast": "Mason Thames, Nico Parker, Gerard Butler, Nick Frost , Julian Dennison, Gabriel Howell, Bronwyn James, Harry Trevaldwyn, Ruth Codd, Peter Serafinowicz, Murray McArthur"  
},
{
    "id": 20250131250723,
    "title": "Valiant One",
    "release_year": 2025,
    "release_date": "2025-01-31",
    "poster_path": "https://drive.google.com/file/d/1TW5iNTEaOSU1c-bf2Zol9pZoDn5vDJ9x/view?usp=drive_link",
    "vote_average": 5.1,
    "overview": "A U.S. Army helicopter crashes in North Korean territory, forcing Captain Edward Brockman (Chase Stokes) and a team of tech specialists to navigate hostile terrain and escort a critical civilian across the Demilitarized Zone to safety.",
    "genres": [
        "War",
        "Action",
        "Thriller"
    ],
    "trailer_url": "https://youtu.be/YqOdTsbftl4?si=nJCvlc-cwvzhuHsp",
    "stream_url": "https://uflix.cc/play/tt21442114",
    "download_links": [
        {
            "name": "1080p.WEBRip",
            "url": "magnet:?xt=urn:btih:F54D23663C321B4CFB716DDE312456D509B245F1&dn=Valiant.One.2025.1080p.WEBRip.10Bit.DDP5.1.x265-Asiimov.mkv&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.3 GB",
            "clicks": 0
        },
        {
            "name": "2160p.WEB-DL",
            "url": "magnet:?xt=urn:btih:9BCF214996A6077618FF69B5F96A6AFAD19F5527&dn=Valiant.One.2025.2160p.WEB-DL.DDP5.1.SDR.H265-AOC&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "9.6 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEB-DL",
            "url": "magnet:?xt=urn:btih:5BCF7BB54AF32E2D49760F900D0F87A82D31DBCB&dn=Valiant+One+2025+1080p+AMZN+WEB-DL+DUAL+DDP5.1+H.264-TBMovies&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.anirena.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Ftorrent.hificode.in%3A6969%2Fannounce&tr=udp%3A%2F%2Fec2-18-191-163-220.us-east-2.compute.amazonaws.com%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.bjut.jp%3A443%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=https%3A%2F%2Ftracker.moeking.me%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.renfei.net%3A8080%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.privateseedbox.xyz%3A2710%2Fannounce&tr=https%3A%2F%2Ftracker.lilithraws.org%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "5.1 GB",
            "clicks": 0
        }
    ],
    "director": "Steve Barnett",
    "runningTime": "86 min",
    "budget": "$1.2 million",
    "cast": "Chase Stokes, Lana Condor, Desmin Borges, Callan Mulvey, Jonathan Whitesell, Daniel Jun"
},
{
    "id": 20250815250722,
    "title": "Cleaner",
    "release_year": 2025,
    "release_date": "2025-02-21",
    "poster_path": "https://drive.google.com/file/d/1MCvWHvomvU8EGK_JPPyfiTseXXN9OCss/view?usp=drive_link",
    "vote_average": 5.1,
    "overview": "Joanna “Joey” Locke, a former elite soldier working as a skyscraper window cleaner, must fight her way up 90 floors to rescue her brother and hundreds of hostages after eco-terrorists seize a high-rise building.",
    "genres": [
        "Action",
        "Thriller",
        "Drama"
    ],
    "trailer_url": "https://www.youtube.com/watch?v=d2y3PKrk4Vw",
    "stream_url": "https://uflix.cc/play/tt27812086",
    "download_links": [
        {
            "name": "2160p WEB-DL",
            "url": "magnet:?xt=urn:btih:F524FE7310A02850C8F39A4557337CFBEBAC8833&dn=Cleaner+2025+2160p+Sky+WEB-DL+DDP5.1+H.265-TBMovies&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.anirena.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.anirena.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Ftorrent.hificode.in%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=https%3A%2F%2Ftracker.bjut.jp%3A443%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=https%3A%2F%2Ftracker.moeking.me%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.lilithraws.org%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "9.9 GB",
            "clicks": 0
        },
        {
            "name": "720p WEB-DL",
            "url": "magnet:?xt=urn:btih:2F553D82CAA03BAF3D5477C3406BD12EB26B49C6&dn=Cleaner+2025+720p+Sky+WEB-DL+DDP5.1+H.265-TBMovies&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.anirena.com%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.anirena.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Ftorrent.hificode.in%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=https%3A%2F%2Ftracker.bjut.jp%3A443%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=https%3A%2F%2Ftracker.moeking.me%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.lilithraws.org%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.1 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEBRip (Hindi)",
            "url": "magnet:?xt=urn:btih:284C2491A4753B0C36C3D6722484AE5EA5D45439&dn=Cleaner+%282025%29+1080p+WEBRip+x264+AAC+%5B+Hin%2C+Eng+%5D+ESub&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.auctor.tv%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.gbitt.info%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.7 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEBRip",
            "url": "magnet:?xt=urn:btih:9B349227845D6E4239B632CD4FA847B5757F3460&dn=Cleaner.2025.1080p.10bit.WEBRip.6CH.x265.HEVC-PSA&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.7 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEBRip",
            "url": "magnet:?xt=urn:btih:17F41082FCE4180F6B88F379AA09A3B5D0546742&dn=Cleaner.2025.1080p.WEBRip.x265-DH&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.8 GB",
            "clicks": 0
        },
        {
            "name": "1080p WEB-DL",
            "url": "magnet:?xt=urn:btih:FEA863700162D01838C24F01C3B48EA1411E054E&dn=Cleaner+2025+1080p+WEB-DL+HEVC+x265+5.1+BONE&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fr.l5.ca%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2F&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker.gcrenwp.top%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.0x7c0.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fbandito.byterunner.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fevan.im%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.4 GB",
            "clicks": 0
        }
    ],
    "director": "Martin Campbell",
    "runningTime": "104 min",
    "budget": "$25 million",
    "cast": "Daisy Ridley, Clive Owen, Taz Skylar, Matthew Tuck, Flavia Watson, Ray Fearon, Rufus Jones"
}
],
        "hindi_movies": Array.from({length: 12}, (_, i) => ({ id: 1000 + i, title: `Hindi Movie ${i+1}`, release_year: 2023 - i, release_date: `${2023-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 7.0 + (i/10), overview: `This is a great Hindi movie number ${i+1}.`, genres: ["Drama", "Action"], download_links: [{name: "720p", url: "#", size: "1.2GB", clicks: 0}], director: "Hindi Director", runningTime: "150 min", budget: "N/A", cast: "Actor A, Actress B" })),
        "south_indian_movies": Array.from({length: 12}, (_, i) => ({ id: 1100 + i, title: `South Indian Movie ${i+1}`, release_year: 2023 - i, release_date: `${2023-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 7.5 + (i/10), overview: `This is a great South Indian movie number ${i+1}.`, genres: ["Action", "Thriller"], download_links: [{name: "720p", url: "#", size: "1.3GB", clicks: 0}], director: "South Director", runningTime: "160 min", budget: "N/A", cast: "Actor C, Actress D" })),
        "south_hindi_dubbed": Array.from({length: 12}, (_, i) => ({ id: 1200 + i, title: `South Movie (Hindi Dub) ${i+1}`, release_year: 2022 - i, release_date: `${2022-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 7.2 + (i/10), overview: `This is a great dubbed movie number ${i+1}.`, genres: ["Action", "Comedy"], download_links: [{name: "720p", url: "#", size: "1.1GB", clicks: 0}], director: "South Director", runningTime: "155 min", budget: "N/A", cast: "Actor E, Actress F" })),
        "bangla_movies": [{
    "id": 20250331250722,
    "title": "Borbaad",
    "release_year": 2025,
    "release_date": "2025-03-31",
    "poster_path": "https://drive.google.com/file/d/1PBihmn8iTzgmUcRhiObQGbTZHnFe7l6r/view?usp=drive_link",
    "vote_average": 7.1,
    "overview": "Ariyan Mirza, a fearless young man, finds himself caught between love and vengeance as he battles powerful enemies to protect his family and uncover a buried truth.",
    "genres": [
        "Action",
        "Romance",
        "Thriller"
    ],
    "trailer_url": "https://youtu.be/Mt-Lpxi5X0E?si=v6QjseMEgz_ZzPo2",
    "stream_url": "https://uflix.cc/play/tt33305312",
    "download_links": [
        {
            "name": "1080p.HDRip",
            "url": "magnet:?xt=urn:btih:11ECF1A0E65E2D4B3FD71CC10539255651E21C8D&dn=Borbaad.2025.1080p.HDRip.BEN.ORG.2.0.H.264-HDWebMovies&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.auctor.tv%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.gbitt.info%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "2.8 GB",
            "clicks": 0
        },
        {
            "name": "720p.HDRip",
            "url": "magnet:?xt=urn:btih:95FE282BE555DA0C2BF2768FA0AE4DEF7011F895&dn=Borbaad.2025.720p.HDRip.BEN.ORG.2.0.H.264-HDWebMovies&tr=https%3A%2F%2Ftracker.bt4g.com%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.auctor.tv%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.gbitt.info%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker-udp.gbitt.info%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce",
            "size": "1.5 GB",
            "clicks": 0
        }],
    "director": "Mehedi Hassan Hridoy",
    "runningTime": "139 min",
    "budget": "$1.8–2.2 millions",
    "cast": "Shakib Khan, Jisshu Sengupta, Idhika Paul, Misha Sawdagor, Fazlur Rahman Babu, Shahiduzzaman Selim, Mamunur Rashid, Riya Ganguly, Intekhab Dinar, Nusrat Jahan, Manav Sachdev"
    }
    ],
   

        "kolkata_bangla_movies": Array.from({length: 12}, (_, i) => ({ id: 1400 + i, title: `Kolkata Movie ${i+1}`, release_year: 2021 - i, release_date: `${2021-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 7.8 - (i/10), overview: `This is a great Kolkata movie number ${i+1}.`, genres: ["Drama", "Romance"], download_links: [{name: "720p", url: "#", size: "1.0GB", clicks: 0}], director: "Kolkata Director", runningTime: "130 min", budget: "N/A", cast: "Actor I, Actress J" })),
        "animated_movies": [
            { "id": 129, "title": "Spirited Away", "release_year": 2001, "release_date": "2001-07-20", "poster_path": "/39wmItIW2asR_4XUfA7429wPfZ4.jpg", "vote_average": 8.5, "overview": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.", "genres": ["Animation", "Family", "Fantasy"], "trailer_url": "https://www.youtube.com/watch?v=ByXuk9QqQkk", "download_links": [{name: "1080p", url: "#", size: "1.7GB", clicks: 0}], director: "Hayao Miyazaki", runningTime: "125 min", budget: "$19 million", cast: "Rumi Hiiragi, Miyu Irino, Mari Natsuki" },
            ...Array.from({length: 11}, (_, i) => ({ id: 1500 + i, title: `Animated Movie ${i+1}`, release_year: 2020 - i, release_date: `${2020-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 8.1 - (i/10), overview: `This is a great animated movie number ${i+1}.`, genres: ["Animation", "Family"], download_links: [{name: "720p", url: "#", size: "900MB", clicks: 0}], director: "Animation Director", runningTime: "90 min", budget: "N/A", cast: "Voice Actor A, Voice Actor B" }))
        ],
        "foreign_language_movies": [
             { "id": 496243, "title": "Parasite", "release_year": 2019, "release_date": "2019-05-30", "poster_path": "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "vote_average": 8.5, "overview": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.", "genres": ["Comedy", "Thriller", "Drama"], "trailer_url": "https://www.youtube.com/watch?v=5xH0HfJHsaY", "download_links": [{name: "1080p", url: "#", size: "2.2GB", clicks: 0}], director: "Bong Joon Ho", runningTime: "132 min", budget: "$11.4 million", cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong" },
             ...Array.from({length: 11}, (_, i) => ({ id: 1600 + i, title: `Foreign Film ${i+1}`, release_year: 2018 - i, release_date: `${2018-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 7.9 - (i/10), overview: `This is a great foreign film number ${i+1}.`, genres: ["Drama", "Thriller"], download_links: [{name: "720p", url: "#", size: "1.4GB", clicks: 0}], director: "Foreign Director", runningTime: "110 min", budget: "N/A", cast: "Actor K, Actress L" }))
        ],
        "english_tv_series": Array.from({length: 12}, (_, i) => ({ id: 1700 + i, title: `English Series ${i+1}`, release_year: 2023 - i, release_date: `${2023-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 8.5 - (i/10), overview: `This is a great English series number ${i+1}.`, genres: ["Drama", "Mystery"], download_links: [{name: "S01", url: "#", size: "5.5GB", clicks: 0}], director: "N/A", runningTime: "50 min/ep", budget: "N/A", cast: "Actor M, Actress N" })),
        "bengali_tv_series": Array.from({length: 12}, (_, i) => ({ id: 1800 + i, title: `Bengali Series ${i+1}`, release_year: 2022 - i, release_date: `${2022-i}-01-01`, poster_path: `/placeholder.jpg`, vote_average: 8.2 - (i/10), overview: `This is a great Bengali series number ${i+1}.`, genres: ["Comedy", "Drama"], download_links: [{name: "S01", url: "#", size: "4.2GB", clicks: 0}], director: "N/A", runningTime: "25 min/ep", budget: "N/A", cast: "Actor O, Actress P" }))
    }
}
;

