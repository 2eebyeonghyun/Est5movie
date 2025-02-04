import { get } from '../base/util.js';

export function initDarkMode() {

    try {
        const button = get(".btn-change");
        let theme;

        // 로컬스토리지에 값이 있으면 로컬값을 가져오고 그게 아니면 light값을 가져온다.
        // 로컬값을 못가져오는 경우 기본값을 light로 준다.
        try {
            theme = localStorage.getItem('mode') || 'light';
        } catch (error) {
            console.error('localStorage 접근 실패', error);
            theme = 'light';
        }

        // theme변수가 dark와 같은지 비교하여 참/거짓을 구분한다.
        let status = theme === 'dark';

        // 참이면 themeDarkMode 호출 거짓이면 themeLightMode 호출
        if (status) {
            themeDarkMode();
        } else {
            themeLightMode();
        }

        // 버튼 클릭 이벤트
        button.addEventListener('click', () => {
            console.log('버튼이 눌렸습니다.');

            // theme가 다크모드가 적용된 상태면 themeLightMode호출한다.
            if (status) {
                themeLightMode();
            } else {
                themeDarkMode();
            }
        });

        // 다크 모드 적용
        function themeDarkMode() {
            try {
                // 로컬스토리지에 dark를 저장한다.
                localStorage.setItem("mode", "dark");
            } catch (error) {
                console.error('localStorage 저장 실패', error);
            }
            // html태그에 data-mode="dark" 속성을 추가한다.
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