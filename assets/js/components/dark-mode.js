import { get } from '../base/util.js';
import { loadHeader } from "./loadHF.js";

// export async function initDarkMode() {

//     try {
//         await loadHeader();
    
//         const button = get('.btn-change');
//         let theme = localStorage.getItem('mode'); // 초기 theme 가져오기
//         let status = false;
    
//         if (theme === 'dark') {
//             themeDarkMode();
//         } else if (theme === 'light') {
//             themeLightMode();
//         }
    
//         // 버튼 클릭 이벤트
//         button.addEventListener('click', () => {
//             if (!status) {
//                 themeDarkMode();
//             } else {
//                 themeLightMode();
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
//         console.error('error : ', error);
//     }
// }

export function initDarkMode() {

    try {
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
        console.error('initDarkMode error: ', error);
    }
}