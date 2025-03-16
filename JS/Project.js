// 메뉴 토글
const menus = document.querySelectorAll('.menu');
menus.forEach(menu => {
    menu.addEventListener('click', function(e) {
        const isActive = this.classList.contains('active');
        menus.forEach(m => {
            m.classList.remove('active');
            m.querySelectorAll('li').forEach(li => {
                li.style.opacity = '0';
            });
        });
        if (!isActive) {
            this.classList.add('active');
            setTimeout(() => {
                this.querySelectorAll('li').forEach(li => {
                    li.style.opacity = '1';
                });
            }, 50);
        }
    });
});

// 프로젝트 상세 표시
const menuItems = document.querySelectorAll('.menu-item');
const projectContainers = document.querySelectorAll('.project-container');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation(); // 메뉴 토글과 충돌 방지
        const projectId = this.getAttribute('data-project');
        
        // 모든 프로젝트 컨테이너 비활성화
        projectContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // 선택된 프로젝트 활성화
        const selectedProject = document.getElementById(projectId);
        if (selectedProject) {
            selectedProject.classList.add('active');
        }
    });
});

// 페이지 로드 시 기본 설정
document.addEventListener('DOMContentLoaded', () => {
    const firstMenu = document.querySelector('.menu');
    if (firstMenu) {
        firstMenu.classList.add('active');
        firstMenu.querySelectorAll('li').forEach(li => {
            li.style.opacity = '1';
        });
        
        // 첫 번째 프로젝트 기본 활성화
        const firstProject = document.querySelector('.project-container');
        if (firstProject) {
            firstProject.classList.add('active');
        }
    }
});