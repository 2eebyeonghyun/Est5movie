import { formEl, searchPoint, initializePage } from '../components/search.js';
import { darkMode } from '../components/dark-mode.js';

// 화면이 로드됐을 때 initializePage함수를 호출한다.
document.addEventListener('DOMContentLoaded', initializePage);

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPoint();
});

function swiper() {
    const swiper = new Swiper(".mainSwiper", {
        navigation: {
            nextEl: ".main-page .swiper-option .swiper-navigation .swiper-button-next",
            prevEl: ".main-page .swiper-option .swiper-navigation .swiper-button-prev",
        },
    });

    const swiper2 = new Swiper(".mainBotSwiper", {
        slidesPerView: 7,
        spaceBetween: 30,
    });
}

swiper();
darkMode();