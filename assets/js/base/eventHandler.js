import { get } from "./util.js";
import { loadHeader } from "../components/loadHF.js";
import { searchPoint } from "../components/search.js";
import { scrollHeader } from "../components/scrollHeader.js";
import { initDarkMode } from "../components/dark-mode.js";

// 이벤트처리를 따로 분류했더니 중복이벤트오류가 발생하여 이벤트는 한 곳에서 호출
export async function initializeEvents() {
    try {
        await loadHeader();
        scrollHeader();
    
        // 서치 검색 영역
        const formEl = get(".form");
        if (formEl) {
            formEl.addEventListener("submit", (e) => {
                e.preventDefault();
                searchPoint();
            });
        }

        // 다크모드 영역
        initDarkMode();
    } catch (error) {
        console.error('initializeEvents error: ', error);
    }
}
