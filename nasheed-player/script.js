document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    const muteBtn = document.getElementById('muteBtn');
    const loopBtn = document.getElementById('loopBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const lyricsContent = document.getElementById('lyricsContent');
    const toggleAutoScroll = document.getElementById('toggleAutoScroll');
    
    // Initialize state
    let isPlaying = false;
    let isMuted = false;
    let isLooping = false;
    let autoScroll = true;
    
    // Track data
    const tracks = {
        1: {
            title: "تورا بورا",
            artist: "المنشد",
            duration: "2:36",
            coverArt: "/images/nasheed_cover.jpg",
            audioSrc: "/audio/nasheed_jihad.mp3",
            lyrics: [
                { time: 0, text: "ثائـر ٌ من تـورا بـورا" },
    { time: 1.9, text: "رامح ٌ مـن قـندهارْ" },
    { time: 4, text: "مُقبل ٌ من أرض بابل" },
    { time: 6, text: "صامد ٌ رغم الدمارْ" },
    { time: 8.5, text: " باذل ٌ من أرض هبهب َ" },
    { time: 11, text: " بالدما صنع النهارْ" },
    { time: 13.5, text: "رافـع ٌ وسـط الرمـادي" },
    { time: 16, text: " بـيـرقا ً للإنتصارْ" },
    { time: 18, text: "مُشعل ٌ للحرب أضحى" },
    { time: 20.4, text: " قاتلا ً عبد الصليبْ" },
    { time: 22.16, text: " راكبـاً هـول َ المنايا" },
    { time: 25.1, text: " نافحا ً عطرا ً وطيبْ" },
    { time: 27.14, text: " يملأ الدنيا هزيما ً" },
    { time: 29.20, text: "يسمع العجب َ العجيبْ!" },
    { time: 31.25, text: " مُفـتـد ٍ طهر العقيدة" },
    { time: 34.24, text: " صار في الدنيا غريبْ!!" },
    { time: 37.09, text: "أخـوة التـوحيـد هيـا"},
    { time: 38.25, text: "أشعـلـوا كل الثغورْ" },
    { time: 41.21, text: " جـنـة الرحمن وعـد ٌ" },
    { time: 43.27, text: " دونه بذل النحورْ" },
    { time: 46.12, text: " لن يعض ّ الغمدُ عضبا" },
    { time: 48.17, text: " سلّه ليث ٌ هصورْ" },
    { time: 50.26, text: " حـثـّه أن الـثـكـالـى" },
    { time: 53.1, text: "غـال َ عـفـتـهـا كفورْ" },
    { time: 55.24, text: "لن يشيب بقيد ذل ّ" },
    { time: 57.14, text: " ضامر ٌ ألِف َ الصهيلْ" },
    { time: 59.3, text: " يـرتـجـي القتل َ شهيدا ً" },
    { time: 62.15, text: "باسم الثغر جميلْ" },
    { time: 64.17, text: " سـره صـوت الحـواري" },
    { time: 66.27, text: " ويكأن لهـا هديلْ" },
    { time: 69.28, text: " لا يـُفـزّع يـوم حشـر ٍ" },
    { time: 71.23, text: " رافـل الظـل الظليلْ" },
    { time: 74.2, text: "ما محا ذل ّ النواصي" },
    { time: 76, text: " غير زخات الرصاصْ" },
    { time: 78.1, text: "فاقـتـلوا أهـل العمالـة" },
    { time: 80.25, text: " ليس من هذا مناصْ" },
    { time: 83.09, text: "أهل صندوق الدياثة" },
    { time: 85.16, text: " أرتجوا فيه الخلاصْ" },
    { time: 87.20, text: " بالخيانة والتحاصـص" },
    { time: 89.30, text: " والأمانيّ الرخاصْ" },
    { time: 92.35, text: "مزقوا الصحوات وارمـوا" },
    { time: 94.27, text: " كـل زنديق ٍ مهينْ" },
    { time: 97.05, text: "واركبوا الموت جوادا ً" },
    { time: 99.14, text: "ضابحا ً في كل حينْ" },
    { time: 101.24, text: " وازرعـوا في كـل فـج ٍّ" },
    { time: 104.02, text: " للـعـدا مـوتـا ً يـقـينْ" },
    { time: 106.02, text: " وامـلأوا الـطـرقات رعبا ً" },
    { time: 108.21, text: " بالعبـوة والكمينْ" },
    { time: 110.10, text: "طلـقـوا الدنيا ثلاثا ً" },
    { time: 113.12, text: " وارتضوا عنها الفِراقْ" },
    { time: 115.20, text: " نحـن فرسان العقيدة" },
    { time: 118, text: "نـفـتدي طهر العراقْ" },
    { time: 120.1, text: " نسمع الحوراء تهمي" },
    { time: 122.2, text: " نشتهي منها العناقِ" },
    { time: 124.25, text: " جـذوة الـتـوحـيـد تأبـى" },
    { time: 127, text: " أن يـخالـطـنا نفاقْ" },
    { time: 129.15, text: "ثار َ في صدري نحيب ٌ" },
    { time: 131.16, text: " هزني أني أسير ْ" },
    { time: 134, text: " أرتجي القتل شهيدا ً" },
    { time: 136.12, text: " أرقب الفجر المنيرْ" },
    { time: 138.15, text: " سـاء حكـام الدنـايـا" },
    { time: 140.13, text: "صيحـتي يوم النفيرْ" },
    { time: 142.9, text: " أن مولانـا أسـامة" },
    { time: 145.16, text: " شـيـخـنا وهو الأميرْ" }
            ]
        },
        2: {
            title: "نشيد الفجر",
            artist: "المنشد الثاني",
            duration: "3:15",
            coverArt: "/images/nasheed_cover_2.jpg",
            audioSrc: "/audio/nasheed_2.mp3",
            lyrics: [
                { time: 0, text: "بزغ الفجر على الآفاق" },
                { time: 2.5, text: "ونور الحق تجلى في السماء" },
                // ... add more lyrics for second song
            ]
        }
    };

    // Load lyrics into container
    function loadLyrics(trackId) {
        const trackLyrics = tracks[trackId].lyrics;
        lyricsContent.innerHTML = '';
        trackLyrics.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'lyrics-line';
            lineElement.dataset.time = line.time;
            lineElement.textContent = line.text;
            lineElement.addEventListener('click', () => {
                audioPlayer.currentTime = line.time;
                if (!isPlaying) {
                    playAudio();
                }
            });
            lyricsContent.appendChild(lineElement);
        });
    }
    
    // Track switching functionality
    const trackButtons = document.querySelectorAll('.track-button');
    
    function switchTrack(trackId) {
        const track = tracks[trackId];
        document.getElementById('songTitle').textContent = track.title;
        document.getElementById('songArtist').textContent = track.artist;
        document.querySelector('.album-art img').src = track.coverArt;
        audioPlayer.src = track.audioSrc;
        
        // Reset player state
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        progressBar.style.width = '0%';
        currentTimeDisplay.textContent = '0:00';
        
        // Update active button
        trackButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.track === trackId.toString()) {
                btn.classList.add('active');
            }
        });
        
        loadLyrics(trackId);
    }
    
    // Update active lyrics based on current time
    function updateActiveLyrics() {
        const currentTime = audioPlayer.currentTime;
        const lines = document.querySelectorAll('.lyrics-line');
        
        let activeLineIndex = -1;
        const currentTrackId = parseInt(document.querySelector('.track-button.active').dataset.track);
        const currentLyrics = tracks[currentTrackId].lyrics;
        
        for (let i = currentLyrics.length - 1; i >= 0; i--) {
            if (currentTime >= currentLyrics[i].time) {
                activeLineIndex = i;
                break;
            }
        }
        
        lines.forEach((line, index) => {
            if (index === activeLineIndex) {
                line.classList.add('active');
                if (autoScroll) {
                    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                line.classList.remove('active');
            }
        });
    }
    
    // Playback control functions
    function playAudio() {
        audioPlayer.play()
            .catch(e => console.error("Error playing audio:", e));
        playPauseBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';
        isPlaying = true;
    }
    
    function pauseAudio() {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        isPlaying = false;
    }
    
    // Event listeners
    trackButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTrack(parseInt(button.dataset.track));
        });
    });
    
    audioPlayer.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
        loadLyrics(1); // Load initial lyrics
    });
    
    audioPlayer.addEventListener('timeupdate', function() {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = percentage + '%';
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        updateActiveLyrics();
    });
    
    audioPlayer.addEventListener('ended', function() {
        if (isLooping) {
            audioPlayer.currentTime = 0;
            audioPlayer.play().catch(e => console.error("Error playing audio:", e));
        } else {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            isPlaying = false;
        }
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
    
    restartBtn.addEventListener('click', function() {
        audioPlayer.currentTime = 0;
        if (!isPlaying) {
            playAudio();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
    });
    
    nextBtn.addEventListener('click', function() {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
    });
    
    muteBtn.addEventListener('click', function() {
        audioPlayer.muted = !audioPlayer.muted;
        muteBtn.innerHTML = audioPlayer.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        isMuted = audioPlayer.muted;
    });
    
    loopBtn.addEventListener('click', function() {
        isLooping = !isLooping;
        loopBtn.style.color = isLooping ? 'var(--primary-color)' : 'var(--gray-color)';
        audioPlayer.loop = isLooping;
    });
    
    toggleAutoScroll.addEventListener('click', function() {
        autoScroll = !autoScroll;
        toggleAutoScroll.style.color = autoScroll ? 'var(--primary-color)' : 'var(--gray-color)';
    });
    
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value;
        if (this.value > 0 && audioPlayer.muted) {
            audioPlayer.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });
    
    progressContainer.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            playPauseBtn.click();
            e.preventDefault();
        } else if (e.code === 'ArrowLeft') {
            audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
            e.preventDefault();
        } else if (e.code === 'ArrowRight') {
            audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
            e.preventDefault();
        } else if (e.code === 'KeyM') {
            muteBtn.click();
            e.preventDefault();
        }
    });
    
    // Helper function to format time
    function formatTime(seconds) {
        if (!isFinite(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});