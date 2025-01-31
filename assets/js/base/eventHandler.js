import { get } from "./util.js";
import { loadHeader } from "../components/loadHF.js";
import { searchPoint } from "../components/search.js";
import { scrollHeader } from "../components/scrollHeader.js";

// 이벤트처리를 따로 분류했더니 중복이벤트오류가 발생하여 이벤트는 한 곳에서 호출
export async function initializeEvents() {
    try {
        await loadHeader();
        scrollHeader();
    
        document.addEventListener("click", (e) => {
            if (e.target.matches(".btn-change")) {
                let currentMode = document.documentElement.getAttribute("data-mode");
                let newMode = currentMode === "dark" ? "light" : "dark";
                try {
                    localStorage.setItem("mode", newMode);
                } catch (error) {
                    console.error("localStorage 저장 실패", error);
                }
                document.documentElement.setAttribute("data-mode", newMode);
            }
        });

        document.addEventListener("submit", (e) => {
            if (e.target.matches(".form")) {
                e.preventDefault();
                const inputEl = e.target.querySelector(".input");
                if (!inputEl) return;
                const searchQuery = inputEl.value.trim();
                if (!searchQuery) return;
                window.location.href = `search.html?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    } catch (error) {
        console.error('error', error);
    }
}
