import { get } from "./util.js";
import { loadHeader } from "../components/loadHF.js";
import { searchPoint } from "../components/search.js";

// 이벤트처리를 따로 분류했더니 중복이벤트오류가 발생하여 이벤트는 한 곳에서 호출
// export async function initializeEvents() {

//     try {
//         await loadHeader();
    
//         // 서치 검색 영역
//         const formEl = get(".form");

//         formEl.addEventListener("submit", (e) => {
//             e.preventDefault();
//             searchPoint();
//         });


//         // 다크모드 영역
//         const button = get(".btn-change");
//         // 초기 theme 가져오기
//         let theme = localStorage.getItem('mode');
//         let status = theme === 'dark';

//         if (status) {
//             themeDarkMode();
//         } else {
//             themeLightMode();
//         }

//         // 버튼 클릭 이벤트
//         button.addEventListener('click', () => {
//             if (status) {
//                 themeLightMode();
//             } else {
//                 themeDarkMode();
//             }
//         });

//         // 다크 모드 적용
//         function themeDarkMode() {
//             localStorage.setItem("mode", "dark");
//             document.documentElement.setAttribute('data-mode', 'dark');
//             status = true;
//         }

//         // 라이트 모드 적용
//         function themeLightMode() {
//             localStorage.setItem("mode", "light");
//             document.documentElement.setAttribute('data-mode', 'light');
//             status = false;
//         }
//     } catch (error) {
//         console.error('error', error);
//     }
    
// }


let isInitialized = false;
let status = false;

export async function initializeEvents() {
    if (isInitialized) return; // 이미 초기화되었으면 종료
    isInitialized = true;

    try {
        await loadHeader();

        // 서치 검색 영역
        const formEl = get(".form");
        if (formEl && !formEl.hasEventListener) {
            formEl.addEventListener("submit", (e) => {
                e.preventDefault();
                console.log('검색 실행');
                searchPoint();
            });
            formEl.hasEventListener = true; // 이벤트 리스너 등록 표시
        } else {
            console.error("form 요소를 찾을 수 없습니다.");
        }

        // 다크모드 영역
        const button = get(".btn-change");
        if (button && !button.hasEventListener) {
            // 초기 theme 가져오기
            let theme = localStorage.getItem('mode');

            if (theme === 'dark') {
                themeDarkMode();
            } else if (theme === 'light') {
                themeLightMode();
            } else {
                themeDarkMode();
            }

            // 버튼 클릭 이벤트
            button.addEventListener('click', () => {
                console.log('다크모드 클릭 현재 상태:', status);
                if (!status) {
                    themeDarkMode();
                } else {
                    themeLightMode();
                }
            });
            button.hasEventListener = true; // 이벤트 리스너 등록 표시
        }

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
    } catch (error) {
        console.error('error', error);
    }
}