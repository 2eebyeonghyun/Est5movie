// http://www.omdbapi.com/?apikey=2d7b9efb

import api from "../base/api.js";
import { get } from "../base/util.js";

export const formEl = get(".form");
export const filterEl = get(".input");
export const yearEl = get(".select-year");
export const typeEl = get(".select-type");
export const btn = get(".btn-search");

export function buttonEvent() {
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        searchPoint();
    });
}

export function searchPoint() {
    try {
        const value = filterEl.value.trim();

        // 선택된 값이 all이 아니면 선택된 값을 가져온다.
        const year = yearEl.value !== "all" ? yearEl.value : "all";
        const type = typeEl.value !== "all" ? typeEl.value : "all";

        // 페이지 이동하면서 파라미터 값도 전달
        // let newUrl = `https://2eebyeonghyun.github.io/Est5movie/public/result.html?search=${encodeURIComponent(value)}`;
        let newUrl = `/public/result.html?search=${encodeURIComponent(value)}`;

        if (year) {
            newUrl += `&year=${encodeURIComponent(year)}`;
        }

        if (type) {
            newUrl += `&type=${encodeURIComponent(type)}`;
        }

        if (!value) {
            alert("검색어를 입력해주세요.");
            return;
        }

        // 페이지를 이동한다.
        window.location.href = newUrl;
    } catch (error) {
        alert("에러가 발생했습니다.");
    }
}

export function initializePage() {
    try {
        // URLSearchParams : 쿼리 매개변수를 읽고 가져온다.
        const urlParams = new URLSearchParams(window.location.search);

        // 파라미터 값을 읽어온다.
        const searchParam = urlParams.get("search");
        const year = urlParams.get("year");
        const type = urlParams.get("type");
        let page = 1;

        // 값이 있을 경우 검색 실행
        if (searchParam) {
            // 검색 결과 가져오기
            getMovies(searchParam, year, type, page);
        }
    } catch (error) {
        alert("에러가 발생했습니다.");
    }
}

export async function getMovies(value, year, type, page = 1) {
    try {
        if (filterEl) {
            // 결과값 초기화
            filterEl.innerHTML = "";
        }

        // encodeURIComponent 사용이유 : URI로 데이터를 정확하게 전달하기 위해서 문자열을 인코딩하기 위해 사용
        let url = `${api.BASE_URL}?apikey=${api.API_KEY}&s=${encodeURIComponent(value)}&page=${page}`;

        if (year) {
            url += `&y=${year}`;
        }

        if (type !== "all") {
            url += `&type=${type}`;
        } else if (type === "all") {
            url += `&t=${type}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.Search) {
            console.log(url);
            console.log(data.Search);
            const movies = data.Search;
            console.log(movies);
            const itemCard = document.querySelector(".wrapper-itemcontainer");
            // moviesList 변수에 movies를 map함수를 사용해 새로운 배열로 만든다 (백틱으로 감싼 영역 하나가 배열 요소 하나이다)
            // 이 배열 요소를 join을 사용해서 문자화(문자열 하나로 통합)해서 innerHTML을 통해 작성한다
            // const moviesList =
            // movies.map((movie) => `
            // <div class="itemcontainer-card">
            //     <img src=${movie.Poster}  onerror="this.src='/assets/images/poster-Avengers_Endgame.jpg'" />
            //     <h2 class="itemcontainer-title movie-text">${movie.Title}</h2>
            //     <span class="itemcontainer-title movie-text">${movie.Year}</span>
            // </div>
            // `).join("");
            // console.log(moviesList);
            // itemCard.innerHTML = moviesList;

            itemCard.innerHTML = "";
            movies.forEach((movie) => {
                const movieCard = document.createElement("div");
                movieCard.className = "itemcontainer-card";
                movieCard.innerHTML = `
                <a href="/public/inner-view.html?id=${movie.imdbID}" class="card-item">
                    <img class="result-image" src="${movie.Poster}" onerror="this.src='/assets/images/poster-Avengers_Endgame.jpg'" />
                    <div class="result-informationBox">
                        <h2 class="informationBox-title movie-title">${movie.Title}</h2>
                        <ul class="informationBox-subList">
                            <li class="subList-item"><span class="informationBox-title type-text type-text-${movie.Type}">${movie.Type}</span></li>
                            <li class="subList-item"><span class="informationBox-title movie-year">${movie.Year}</span></li>
                        </ul>
                    </div>
                </a>
                `;
                itemCard.appendChild(movieCard);
            });
        } else {
            console.log("error",data);
        }
    } catch (error) {
        console.error("error", error);
        alert(error.message);
    }
}
