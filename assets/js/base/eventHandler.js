import { get } from "./util.js";
import { loadHeader } from "../components/loadHF.js";
import { searchPoint } from "../components/search.js";

// 이벤트처리를 따로 분류했더니 중복이벤트오류가 발생하여 이벤트는 한 곳에서 호출
export async function initializeEvents() {

    await loadHeader();
    
    // 서치 검색 영역
    const formEl = get(".form");

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        searchPoint();
    });


    // 다크모드 영역
    const button = get(".btn-change");
    // 초기 theme 가져오기
    let theme = localStorage.getItem('mode');
    let status = false;

    if (theme === 'dark') {
        themeDarkMode();
    } else if (theme === 'light') {
        themeLightMode();
    } else {
        themeLightMode();
    }

    // 버튼 클릭 이벤트
    button.addEventListener('click', () => {
        if (!status) {
            themeDarkMode();
        } else {
            themeLightMode();
        }
    });

    // 다크 모드 적용
    function themeDarkMode() {
        localStorage.setItem("mode", "dark");
        document.documentElement.setAttribute('data-mode', 'dark');
        status = true;
    }

    // 라이트 모드 적용
    function themeLightMode() {
        localStorage.setItem("mode", "light");
        document.documentElement.setAttribute('data-mode', 'light');
        status = false;
    }
}
