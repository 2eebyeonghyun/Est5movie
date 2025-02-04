import { get } from '../base/util.js';

export function scrollHeader() {
    
    let lastScrollTop = 0;
    const headerWrap = get('.header');
    
    // passive: true를 사용하면 preventDefault()를 사용할 수 없다.
    // 다만, 스크롤 성능이 개선이된다. 
    // 그래서 scroll 이벤트를 사용할 때 사용하면 좋다.
    window.addEventListener('scroll', () => {
        // 현재 scroll 위치 값을 가져온다.
        const scrollY = window.scrollY;

        // 위치값보다 아래로 스크롤하거나 100px 스크롤 했을 경우 헤더를 y축으로 -100% 이동시킨다.
        // 그게 아니면( 위로 올리면) 헤더가 원위치로 돌아온다.
        if (scrollY > lastScrollTop && scrollY > 100) {
            headerWrap.style.transform = "translateY(-100%)";
        } else {
            headerWrap.style.transform = "translateY(0)";
        }

        headerWrap.classList.toggle('scroll', scrollY > 50);

        lastScrollTop = scrollY;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        if (e.clientY <= 100) {
            headerWrap.style.transform = "translateY(0)";
        }
    }, { passive: true });
}
