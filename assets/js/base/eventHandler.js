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
                e.preventDefault(); // 기본 제출 동작 방지 (iOS에서도 확실하게 막기)
                
                const searchInput = formEl.querySelector("input[name='search']"); // 입력 필드 가져오기
                if (searchInput) {
                    const query = searchInput.value.trim();
                    if (query) {
                        searchPoint(query);
                    } else {
                        console.warn("검색어가 입력되지 않았습니다.");
                    }
                } else {
                    console.error("검색 입력 필드를 찾을 수 없습니다.");
                }
            });
        }

        // 다크모드 영역
        const button = get(".btn-change");
        if (!button) return;

        let theme;
        try {
            theme = localStorage.getItem("mode") || "light";
        } catch (error) {
            console.warn("localStorage 접근 실패", error);
            theme = "light";
        }

        let status = theme === "dark";

        if (status) {
            themeDarkMode();
        } else {
            themeLightMode();
        }

        button.addEventListener("click", () => {
            if (status) {
                themeLightMode();
            } else {
                themeDarkMode();
            }
        });

        function themeDarkMode() {
            try {
                localStorage.setItem("mode", "dark");
            } catch (error) {
                console.warn("localStorage 저장 실패", error);
            }
            document.documentElement.setAttribute("data-mode", "dark");
            status = true;
        }

        function themeLightMode() {
            try {
                localStorage.setItem("mode", "light");
            } catch (error) {
                console.warn("localStorage 저장 실패", error);
            }
            document.documentElement.setAttribute("data-mode", "light");
            status = false;
        }
    } catch (error) {
        console.error("error", error);
    }
}

