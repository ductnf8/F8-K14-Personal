const player = {

    NEXT: 1,
    PREV: -1,

    playlist: document.querySelector('.playlist'),
    songTitle: document.querySelector('.song-title'),
    togglePlayBtn: document.querySelector('.btn-toggle-play'),
    audio: document.querySelector('#audio'),
    playIcon: document.querySelector('#play-icon'),
    nextIcon: document.querySelector('.btn-next'),
    prevIcon: document.querySelector('.btn-prev'),
    progress: document.querySelector('#progress'),
    repeatBtn: document.querySelector('.btn-repeat'),
    cd: document.querySelector('.cd'),
    randomBtn: document.querySelector('.btn-random'),

    isSeeking: false,
    isRepeat: localStorage.getItem('isRepeat') === 'true',
    isRandom: localStorage.getItem('isRandom') === 'true',

    playedHistory: [],

    // Mảng chứa các bài hát
    songs: [
        {
            id: 1,
            name: "Kho Bau (with Rhymastic)",
            path: "./musics/nhac1.mp3",
            artist: "Nguyen A",
        },
        {
            id: 2,
            name: "NET",
            path: "./musics/nhac2.mp3",
            artist: "Nguyen B",
        },
        {
            id: 3,
            name: "Yeu Em Dai Lau - Yeu 5",
            path: "./musics/nhac3.mp3",
            artist: "Nguyen C",
        },
    ],

    currentIndex: parseInt(localStorage.getItem('currentIndex') || 0, 10),

    getCurrentSong() {
        return this.songs[this.currentIndex];
    },

    handlePrevOrNext(step) {
        this.currentIndex = (this.currentIndex + step + this.songs.length) % this.songs.length;
        this.loadCurrentSong();
        this.render();
        this.audio.play();
    },

    randomSong() {
        if (this.playedHistory.length === this.songs.length) {
            this.playedHistory = [];
        }

        const availableIndices = this.songs
            .map((_, index) => index)
            .filter(index => !this.playedHistory.includes(index) && index !== this.currentIndex);

        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

        this.currentIndex = randomIndex;
        this.playedHistory.push(this.currentIndex);

        this.loadCurrentSong();
        this.render();
        this.audio.play();
    },

    loadCurrentSong() {
        const currentSong = this.getCurrentSong(this.currentIndex);
        this.songTitle.textContent = currentSong.name;
        this.audio.src = currentSong.path;
        localStorage.setItem('currentIndex', this.currentIndex);
    },

    init() {
        this.loadCurrentSong();

        this.randomBtn.classList.toggle('active', this.isRandom);
        this.repeatBtn.classList.toggle('active', this.isRepeat);

        this.togglePlayBtn.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
        });

        this.audio.addEventListener('play', () => {
            player.playIcon.classList.add('fa-pause');
            player.playIcon.classList.remove('fa-play');
            this.cd.classList.add('playing');
            this.cd.style.animationPlayState = 'running';
        });

        this.audio.addEventListener('pause', () => {
            player.playIcon.classList.remove('fa-pause');
            player.playIcon.classList.add('fa-play');
            this.cd.style.animationPlayState = 'paused';
        });

        this.nextIcon.addEventListener('click', () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.handlePrevOrNext(this.NEXT);
            }
        });

        this.prevIcon.addEventListener('click', () => {
            if (this.audio.currentTime > 2) {
                this.audio.currentTime = 0;
            } else {
                if (this.isRandom) {
                    this.randomSong();
                } else {
                    this.handlePrevOrNext(this.PREV);
                }
            }
        });

        this.audio.addEventListener('timeupdate', () => {
            const {duration, currentTime} = this.audio;
            if (!duration) return;

            const progressValue = Math.round((currentTime / duration) * 100);
            this.progress.value = progressValue;
            this.progress.style.setProperty('--value', progressValue); // Cập nhật biến CSS cho gradient
        });

        // Tua nhạc trong thời gian thực khi kéo thanh tiến trình
        this.progress.addEventListener('input', (e) => {
            const nextProgress = e.target.value;
            const nextDuration = (nextProgress / 100) * this.audio.duration;
            this.audio.currentTime = nextDuration;
            this.progress.style.setProperty('--value', nextProgress); // Cập nhật gradient khi kéo
        });

        this.progress.addEventListener('mousedown', () => {
            this.isSeeking = true;
        });

        this.progress.addEventListener('mouseup', (e) => {
            this.isSeeking = false;
            const nextProgress = e.target.value;
            const nextDuration = (nextProgress / 100) * this.audio.duration;
            this.audio.currentTime = nextDuration;
            this.progress.style.setProperty('--value', nextProgress); // Cập nhật gradient khi thả
        });

        this.audio.addEventListener('ended', () => {
            if (this.isRepeat) {
                this.audio.play();
            } else if (this.isRandom) {
                this.randomSong();
            } else {
                this.handlePrevOrNext(this.NEXT);
            }
        });

        this.repeatBtn.addEventListener('click', () => {
            this.isRepeat = !this.isRepeat;
            this.repeatBtn.classList.toggle('active', this.isRepeat);
            localStorage.setItem('isRepeat', this.isRepeat);
        });

        this.randomBtn.addEventListener('click', () => {
            this.isRandom = !this.isRandom;
            this.randomBtn.classList.toggle('active', this.isRandom);
            localStorage.setItem('isRandom', this.isRandom);
            this.playedHistory = []; // Reset lịch sử phát khi bật/tắt random
        });

        this.playlist.addEventListener('click', (e) => {
            const songNode = e.target.closest('.song');
            if (songNode) {
                const index = [...this.playlist.children].indexOf(songNode);
                this.currentIndex = index;
                this.loadCurrentSong();
                this.render();
                this.audio.play();
            }
        });

        this.render();
    },

    render() {
        const music = this.songs.map((song, index) => {
            return `
            <div class="song ${this.currentIndex === index ? 'active' : ''}">
                    <div
                        class="thumb"
                        style="
                            background-image: url('https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.artist}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `;
        }).join('');
        this.playlist.innerHTML = music;
    },
};

// Khởi tạo player
player.init();