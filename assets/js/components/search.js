// http://www.omdbapi.com/?apikey=2d7b9efb

import api from '../base/api.js';
import { get } from '../base/util.js';

export const formEl = get('.form');
export const filterEl = get('.input');
export const yearEl = get('.select-year');
export const typeEl = get('.select-type');
export const btn = get('.btn-search');

export function buttonEvent() {
    formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        searchPoint();
    });
};

export function searchPoint() {

    try {
        const value = filterEl.value.trim();
    
        // 선택된 값이 all이 아니면 선택된 값을 가져온다.
        const year = yearEl.value !== 'all' ? yearEl.value : '';
        const type = typeEl.value !== 'all' ? typeEl.value : '';

        // 페이지 이동하면서 파라미터 값도 전달
        // let newUrl = `https://2eebyeonghyun.github.io/Est5movie/public/result.html?search=${encodeURIComponent(value)}`;
        let newUrl = `/public/result.html?search=${encodeURIComponent(value)}`;

        if (year) {
            newUrl += `&year=${encodeURIComponent(year)}`;
        }

        if (type) {
            newUrl += `&type=${encodeURIComponent(type)}`;
        }

        if(!value) {
            alert('검색어를 입력해주세요.');
            return;
        }

        // 페이지를 이동한다.
        window.location.href = newUrl;
    } catch (error) {
        alert('에러가 발생했습니다.');
    }
}

export function initializePage() {
    
    try {
        // URLSearchParams : 쿼리 매개변수를 읽고 가져온다.
        const urlParams = new URLSearchParams(window.location.search);

        // 파라미터 값을 읽어온다.
        const searchParam = urlParams.get('search');
        const year = urlParams.get('year');
        const type = urlParams.get('type');
        let page = 1;

        // 값이 있을 경우 검색 실행
        if (searchParam) {
            // 검색 결과 가져오기
            getMovies(searchParam, year, type, page);
        }
    } catch (error) {
        alert('에러가 발생했습니다.');
    }
}

export async function getMovies(value, year, type, page = 1) {

    try {
        if(filterEl) {
            // 결과값 초기화
            filterEl.innerHTML = '';
        }

        // encodeURIComponent 사용이유 : URI로 데이터를 정확하게 전달하기 위해서 문자열을 인코딩하기 위해 사용
        let url = `${api.BASE_URL}?apikey=${api.API_KEY}&s=${encodeURIComponent(value)}&page=${page}`;

        if(year) {
            url += `&y=${year}`;
        }

        if(type) {
            url += `&type=${type}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if(data.Search) {
            console.log(url);
            console.log(data.Search);
        } else {
            console.log('error');
        }
    } catch (error) {
        console.error('error', error);
        alert(error.message);
    }
}