import { formEl, searchPoint, initializePage, getMovies } from "../components/search.js";
import { darkMode } from "../components/dark-mode.js";

// 화면이 로드됐을 때 initializePage함수를 호출한다.
document.addEventListener("DOMContentLoaded", initializePage);
document.addEventListener("DOMContentLoaded", () => {
    // URLSearchParams객체에서 window.location.search는 ?뒤의 쿼리스트링을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    // 배열로 분리해서 각 type에 맞게 데이터값을 전달함
    const values = [...urlParams.values()];
    const searchValue = values[0];
    let yearValue = values[1];
    let genreValue = values[2];

    // 장르와 제목을 각각 checkbox하기
    const yearCheckboxes = document.querySelectorAll(".yearlist-yearchk");
    const genreCheckboxes = document.querySelectorAll(".genrelist-genrechk");

    yearCheckboxes.forEach((checkbox) => {
        if (checkbox.value === yearValue) {
            checkbox.checked = true;
        }
        checkbox.addEventListener("change", () => {
            yearCheckboxes.forEach((cb) => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
                else if(checkbox) {
                    yearValue = checkbox.value;
                    console.log(yearValue);
                    getMovies(searchValue,yearValue,genreValue,1);
                }
            });
        });
    });

    genreCheckboxes.forEach((checkbox) => {
        if (checkbox.value === genreValue) {
            checkbox.checked = true;
        }
        checkbox.addEventListener("change", () => {
            genreCheckboxes.forEach((cb) => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
                else if(checkbox) {
                    genreValue = checkbox.value;
                    console.log(genreValue);
                    getMovies(searchValue,yearValue,genreValue,1);
                }
            });
        });
    });


});

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPoint();
});

darkMode();
