// 메뉴 토글
const menus = document.querySelectorAll('.menu');
menus.forEach(menu => {
    menu.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        menus.forEach(m => {
            m.classList.remove('active');
            m.querySelectorAll('li').forEach(li => {
                li.style.opacity = '0'; // 비활성화 시 투명도 초기화
            });
        });
        if (!isActive) {
            this.classList.add('active');
            setTimeout(() => {
                this.querySelectorAll('li').forEach(li => {
                    li.style.opacity = '1'; // 활성화 시 부드럽게 나타남
                });
            }, 50); // 약간의 지연으로 자연스러운 전환
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
    intro.style.display = 'none';
    document.body.style.height = '100%';
    window.dispatchEvent(new Event('resize'));
    // 첫 번째 메뉴 자동 활성화 (선택적)
    menus[0].classList.add('active');
    menus[0].querySelectorAll('li').forEach(li => {
        li.style.opacity = '1';
    });
}, 3000);

// 창 크기 조정 시 캐러셀 업데이트
window.addEventListener('resize', updateSlide);