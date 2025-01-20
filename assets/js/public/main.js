import { formEl, searchPoint, initializePage } from '../components/search.js';
import { darkMode } from '../components/dark-mode.js';
import { get } from '../base/util.js';

// 화면이 로드됐을 때 initializePage함수를 호출한다.
document.addEventListener('DOMContentLoaded', initializePage);

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    searchPoint();
});

function swiper() {
    const swiper2 = new Swiper(".mainBotSwiper", {
        slidesPerView: 7,
        spaceBetween: 30,
    });
}

async function mainSlide() {

    try {
        const res = await fetch('../assets/json/main.json');
        const data = await res.json();
        const movies = data.movies;
        console.log(movies);

        const slideBox = get('.swiper-wrapper');

        movies.forEach(movie => {
            const item = document.createElement('li');
            item.classList.add('swiper-slide');

            item.innerHTML = 
            `
                <div class="movie-imgBox">
                    <img src="${movie.Poster}">
                </div>
                <div class="movie-informationBox">
                    <h2 class="movie-title">${movie.Title}</h2>
                    <div class="movie-categoryBox">
                        <p class="movie-category">Type :</p>
                        <span class="movie-category">${movie.Genre}</span>
                    </div>
                    <ul class="movie-ratingBox">
                        <li class="rating-row">
                            <div class="rating-logo">
                                <img src="./assets/images/logo-imdb.svg" alt="Internet Movie Database 로고">
                            </div>
                            <p class="rating-value">${movie.Ratings[0].Value}</p>
                        </li>
                        <li class="rating-row">
                            <div class="rating-logo">
                                <img src="./assets/images/logo-tomato.svg" alt="Rotten Tomatoes 로고">
                            </div>
                            <p class="rating-value">${movie.Ratings[1].Value}</p>
                        </li>
                    </ul>

                    <p class="movie-description">${movie.Plot}</p>
                    <a href="./public/inner-view.html" class="btn-click" aria-label="영화 정보">More Info</a>
                </div>
            `;

            slideBox.appendChild(item);

            const swiper = new Swiper(".mainSwiper", {
                navigation: {
                    nextEl: ".main-page .swiper-option .swiper-navigation .swiper-button-next",
                    prevEl: ".main-page .swiper-option .swiper-navigation .swiper-button-prev",
                },
            });
        })
    } catch (error) {
        console.error('에러 발생:', error.message);
    }
}

swiper();
darkMode();
mainSlide();