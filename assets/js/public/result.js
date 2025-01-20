import { formEl, searchPoint, initializePage } from "../components/search.js";
import { darkMode } from "../components/dark-mode.js";

// 화면이 로드됐을 때 initializePage함수를 호출한다.
document.addEventListener("DOMContentLoaded", initializePage);
document.addEventListener("DOMContentLoaded", () => {
    // URLSearchParams객체에서 window.location.search는 ?뒤의 쿼리스트링을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    // 배열로 분리해서 각 type에 맞게 데이터값을 전달함
    const values = [...urlParams.values()];

        // 장르와 제목을 각각 checkbox하기
        for (let i = 1; i < values.length; i++) {
            const value = values[i];
            console.log(value);
            const yearCheckboxes = document.querySelectorAll(".yearlist-yearchk");
            const genreCheckboxes = document.querySelectorAll(".genrelist-genrechk");

            yearCheckboxes.forEach((checkbox) => {
                if (checkbox.value === value) {
                    checkbox.checked = true;
                }
            });

            genreCheckboxes.forEach((checkbox) => {
                if (checkbox.value === value) {
                    checkbox.checked = true;
                }
            });
        }
    
});

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPoint();
});

darkMode();
