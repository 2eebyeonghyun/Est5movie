import api from "../base/api.js";
import { get } from '../base/util.js';
import { formEl, searchPoint } from "../components/search.js";
import { darkMode } from "../components/dark-mode.js";

const movieContainer = get("#movie-container");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPoint();
});

// TMDB API 공부
// export async function getActorProfile(actor) {
    
//     const res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${TMDB_KEY}&query=actor`);
//     const data = await res.json();

//     if (data.results) {}

//     return null;
// }


function getMovieId(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 영화 데이터를 가져오는 함수
async function fetchMovieDetails() {
  try {

    // 영화의 id값을 가져와 저장한다.
    const movieId = getMovieId('id');

    // 정보가 없다면 에러창을 띄운다.
    if(!movieId) {
        throw new Error('영화 정보를 찾을 수 없습니다.');
    }

    const response = await fetch(`${api.BASE_URL}?apikey=${api.API_KEY}&i=${movieId}`); // OMDb API 호출
    const movie = await response.json(); // JSON 데이터로 변환
    let movieActors = movie.Actors.split(",");

    // 영화 해상도 고해상도로 변경
    let Highposter;
    if(movie.Poster !== '') {
        Highposter = movie.Poster.replace("SX300", "SX3000");
    }

    // 출연배우 이름 가져오기
    let movieActors = movie.Actors.split(",");

    // 데이터를 HTML 구조로 렌더링
    movieContainer.innerHTML = 
    `
        <div class="movie-detail-content">
            <div class="detail-leftBox">
                <div class="movie-img">
                    <img src="${Highposter}" />
                </div>

                <div class="movie-options">
                    <ul>
                        <li class="option-item">
                            <a href="#none">
                                <button type="button" class="option-img btn-favorite"></button>
                                <span class="option-title">Favorite</span>
                            </a>
                        </li>
                        <li class="option-item">
                            <a href="#none">
                                <button type="button" class="option-img btn-later"></button>
                                <span class="option-title">Watch Later</span>
                            </a>
                        </li>
                        <li class="option-item">
                            <a href="#none">
                                <button type="button" class="option-img btn-watched"></button>
                                <span class="option-title">Watched</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="detail-rightBox">
                <div class="movie-detailsBox">
                    <div class="movie-title">${movie.Title}</div>
                    <a href="" class="btn-click" aria-label="예고편">WATCH</a>
                    
                    <div class="detail-row">
                        <span class="detail-text">STORYLINE</span>
                        <p class="movie-description">${movie.Plot}</p>
                    </div>

                    <div class="detail-row">
                        <span class="detail-text">movie information</span>
                        <div class="movie-informationBox">
                            <div class="movie-meta"><strong class="movie-infoTitle">평점</strong><p class="movie-text">${movie.imdbRating}</p></div>
                            <div class="movie-yeaer"><strong class="movie-infoTitle">년도</strong><p class="movie-text">${movie.Year}</p></div>
                            <div class="movie-meta"><strong class="movie-infoTitle">장르</strong><p class="movie-text">${movie.Genre}</p></div>
                            <div class="movie-meta"><strong class="movie-infoTitle">배우</strong><p class="movie-text">${movie.Actors}</p></div>
                            <div class="movie-meta"><strong class="movie-infoTitle">감독</strong><p class="movie-text">${movie.Director}</p></div>
                        </div>
                    </div>
                </div>

                <div class="movie-actors">
                    <span class="detail-text">actors</span>
                    <ul class="actors-list">
                        <li class="actors-item">
                            <img class="actors-img" src="${movie.Poster}"/>
                            <p class="actors-name">${movieActors[0]}</p>
                        </li>

                        <li class="actors-item">
                            <img class="actors-img" src="${movie.Poster}"/>
                            <p class="actors-name">${movieActors[1]}</p>
                        </li>

                        <li class="actors-item">
                            <img class="actors-img" src="${movie.Poster}"/>
                            <p class="actors-name">${movieActors[2]}</p>
                        </li>
                    </ul>
                </div>

                <div class="another-series">
                    <span class="detail-text">another movies</span>
                    <ul class="series-list">
                        <li><a href="#none"><img src="${movie.Poster}" alt="${movie.Actors} Poster" /></a></li>
                        <li><a href="#none"><img src="${movie.Poster}" alt="${movie.Actors} Poster" /></a></li>
                        <li><a href="#none"><img src="${movie.Poster}" alt="${movie.Actors} Poster" /></a></li>
                        <li><a href="#none"><img src="${movie.Poster}" alt="${movie.Actors} Poster" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
  } catch (error) {
      movieContainer.innerHTML = `
      <p>Failed to fetch movie details. Please try again later.</p>
    `;
    console.error("Error fetching movie data:", error);
  }
}

// 페이지가 로드될 때 데이터를 가져옴
fetchMovieDetails();

//기능을 호출하여 동영상 세부 정보를 가져오고 표시합니다
// fetchMovieDetails();

darkMode();
