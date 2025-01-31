import { get } from "./util.js";
import { loadHeader } from "../components/loadHF.js";
import { searchPoint } from "../components/search.js";
import { scrollHeader } from "../components/scrollHeader.js";

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
        const button = get(".btn-change");
        if (!button) return;

        button.replaceWith(button.cloneNode(true));
        const newButton = get(".btn-change");

        newButton.addEventListener("click", () => {
            let currentMode = document.documentElement.getAttribute("data-mode");
            let newMode = currentMode === "dark" ? "light" : "dark";

            try {
                localStorage.setItem("mode", newMode);
            } catch (error) {
                console.error("localStorage 저장 실패", error);
            }

            document.documentElement.setAttribute("data-mode", newMode);
        });

        // 페이지 로드 시 localStorage 값 적용
        applyThemeFromStorage();
    } catch (error) {
        console.error('error', error);
    }
}
