document.addEventListener('DOMContentLoaded', () => {
    // Функция для анимации элементов при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.movie-category, .scroll-animate, .movie-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    };
    
    // Инициализация анимации при загрузке
    animateOnScroll();
    
    // Обработчик прокрутки
    window.addEventListener('scroll', animateOnScroll);
    
    // Обработчики для кнопок жанров
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const genre = btn.getAttribute('data-genre');
            window.location.href = `${genre}.html`;
        });
    });
    
    // Обработчик для логотипа
    document.getElementById('main-logo')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
});

    document.addEventListener('DOMContentLoaded', function() {
    const watchButtons = document.querySelectorAll('.btn[href="#"]');
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeModal = document.querySelector('.close-modal');
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.video-progress');
    const fullscreenBtn = document.querySelector('.fullscreen');
    const videoFiles = {
        // Ужасы
        "Оцепеневшие от страха (2018)": "videos/horror1.mp4",
        "Астрал (2010)": "videos/horror2.mp4",
        "Сайлент Хилл (2006)": "videos/horror3.mp4",
        
        // Комедии
        "Не грози Южному Централу (1995)": "videos/comedy1.mp4",
        "Большой Стэн (2007)": "videos/comedy2.mp4",
        "Очень страшное кино (2000)": "videos/comedy3.mp4",
        
        // Боевики
        "Наёмник (2017)": "videos/action1.mp4",
        "Бросок кобры (2009)": "videos/action2.mp4",
        "Форсаж (2001)": "videos/action3.mp4",
        
        // Фантастика
        "Война миров (2005)": "videos/scifi1.mp4",
        "Терминатор (1984)": "videos/scifi2.mp4",
        "Назад в будущее (1985)": "videos/scifi3.mp4",
    };
    
    watchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const movieTitle = this.closest('.movie-card-content')?.querySelector('h3')?.textContent || 
                             this.closest('.movie-info')?.querySelector('.movies-examples')?.textContent?.split(':')[1]?.split('"')[1];
            
            if (!movieTitle) {
                alert("Не удалось определить фильм");
                return;
            }

            const videoSrc = videoFiles[movieTitle];
            
            if (videoSrc) {
                videoPlayer.src = videoSrc;
                videoModal.style.display = "block";
                document.body.style.overflow = "hidden";
                videoPlayer.play();
                playPauseBtn.textContent = "❚❚";
            } else {
                alert(`Видео для "${movieTitle}" недоступно`);
            }
        });
    });
    
    // Управление видео
    videoPlayer.addEventListener('timeupdate', function() {
        const value = (100 / videoPlayer.duration) * videoPlayer.currentTime;
        progressBar.value = value;
    });
    
    progressBar.addEventListener('input', function() {
        const time = videoPlayer.duration * (progressBar.value / 100);
        videoPlayer.currentTime = time;
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.textContent = "❚❚";
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = "▶";
        }
    });
    
    fullscreenBtn.addEventListener('click', function() {
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
        }
    });
    
    closeModal.addEventListener('click', function() {
        closeVideoPlayer();
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoPlayer();
        }
    });
    
    function closeVideoPlayer() {
        videoModal.style.display = "none";
        videoPlayer.pause();
        document.body.style.overflow = "auto";
    }
    
    // Обработка клавиши ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && videoModal.style.display === "block") {
            closeVideoPlayer();
        }
    });
});