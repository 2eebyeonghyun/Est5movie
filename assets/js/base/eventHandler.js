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
        let theme;
        try {
            theme = localStorage.getItem('mode') || 'light';
        } catch (error) {
            console.error('localStorage 접근 실패', error);
            theme = 'light';
        }

        let status = theme === 'dark';

        if (status) {
            themeDarkMode();
        } else {
            themeLightMode();
        }

        // 버튼 클릭 이벤트
        button.addEventListener('click', () => {
            console.log('버튼이 눌렸습니다.');
            if (status) {
                themeLightMode();
            } else {
                themeDarkMode();
            }
        });

        // 다크 모드 적용
        function themeDarkMode() {
            try {
                localStorage.setItem("mode", "dark");
            } catch (error) {
                console.error('localStorage 저장 실패', error);
            }
            document.documentElement.setAttribute('data-mode', 'dark');
            status = true;
        }

        // 라이트 모드 적용
        function themeLightMode() {
            try {
                localStorage.setItem("mode", "light");
            } catch (error) {
                console.error('localStorage 저장 실패', error);
            }
            document.documentElement.setAttribute('data-mode', 'light');
            status = false;
        }
    } catch (error) {
        console.error('error', error);
    }
}
