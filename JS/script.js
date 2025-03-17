// 눈 내리는 효과 추가
const canvas = document.createElement('canvas');
canvas.id = 'snowCanvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let snowflakes = [];
const numFlakes = 100;

// 캔버스 크기 설정
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// 눈송이 생성
function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < numFlakes; i++) {
        snowflakes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 4 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 3 + 1,
            opacity: Math.random()
        });
    }
}

// 눈 내리는 애니메이션
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    
    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // 눈송이 이동
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        if (flake.y > window.innerHeight) {
            flake.y = -flake.radius;
            flake.x = Math.random() * window.innerWidth;
        }
    });

    requestAnimationFrame(drawSnowflakes);
}

createSnowflakes();
drawSnowflakes();

// 메뉴 토글
const menus = document.querySelectorAll('.menu');
menus.forEach(menu => {
    menu.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        menus.forEach(m => m.classList.remove('active'));
        if (!isActive) {
            this.classList.add('active');
        }
    });
});

// 캐러셀 슬라이드
const slideContainer = document.querySelector('.carousel-slide');
const slides = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function updateSlide() {
    if (slides.length === 0) return;
    const slideWidth = slides[0].clientWidth;
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateSlide();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSlide();
});

// 자동 슬라이드
setInterval(() => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSlide();
}, 5000);

// 초기 슬라이드 설정
updateSlide();

// 인트로 제거 및 초기 메뉴 설정
setTimeout(() => {
    const intro = document.querySelector('.intro');
    if (intro) {
        intro.style.animation = 'fadeOut 1.5s ease forwards';
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1500);
    }
    document.body.style.height = '100%';
    window.dispatchEvent(new Event('resize'));
    
    // 첫 번째 메뉴 자동 활성화
    if (menus.length > 0) {
        menus[0].classList.add('active');
        menus[0].querySelectorAll('li').forEach(li => {
            li.style.opacity = '1';
        });
    }
}, 3000);

// 창 크기 조정 시 캐러셀 업데이트
window.addEventListener('resize', updateSlide);
