import {
    formEl,
    searchPoint,
    initializePage,
    getMovies,
} from "../components/search.js";
import { darkMode } from "../components/dark-mode.js";
import { getAll } from "../base/util.js";
import { fetchSearch, fetchType, fetchYear } from "../base/param.js";

// 화면이 로드됐을 때 initializePage함수를 호출한다.
document.addEventListener("DOMContentLoaded", initializePage);
document.addEventListener("DOMContentLoaded", () => {
    let searchValue = fetchSearch();
    let yearValue = fetchYear();
    let genreValue = fetchType();

    // 장르와 제목을 각각 checkbox하기
    const yearRadio = getAll(".yearlist-yearchk");
    const genreRadio = getAll(".genrelist-genrechk");

    checkMovie(yearRadio, yearValue);
    checkMovie(genreRadio, genreValue);

    // 검색창입력 -> 검색 영화 출력 -> 체크박스로 검색 영화 필터
    function checkMovie(radios, targetValue) {
        radios.forEach((radio) => {
            if (radio.value === targetValue) {
                radio.checked = true;
            }
            radio.addEventListener("click", (e) => {
                // name을 통해서 genre와 year 구분해서 getMovies를 실행
                const name = e.target.name;
                const value = e.target.value;
                if (name === "genre") {
                    genreValue = value;
                    getMovies(searchValue, yearValue, genreValue, 1);
                } else if (name === "year") {
                    yearValue = value;
                    getMovies(searchValue, yearValue, genreValue, 1);
                }
            });
        });
    }
});

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPoint();
});

darkMode();
