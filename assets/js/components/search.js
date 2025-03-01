import api from "../base/api.js";
import { get } from "../base/util.js";
import { fetchType, fetchSearch, fetchYear } from "../base/param.js";
import { getHighPoster } from "../components/highPoster.js";

export const formEl = get(".form");
export const filterEl = get(".input");
export const yearEl = get(".select-year");
export const typeEl = get(".select-type");
export const btn = get(".btn-search");

export let searchParam = fetchSearch();
export let year = fetchYear();
export let type = fetchType();
export let page = 1;


export function searchPoint() {
    try {
        const filterEle = get(".input");
        const yearEle = get(".select-year");
        const typeEle = get(".select-type");

        const value = filterEle.value.trim();

        // 선택된 값이 all이 아닐 경우 선택된 value값을 가져오고 그게 아니면 all을 가져온다.
        const year = yearEle.value !== "all" ? yearEle.value : "all";
        const type = typeEle.value !== "all" ? typeEle.value : "all";

        // 페이지 이동하면서 파라미터 값도 전달
        // encodeURIComponent() -> JS에서 문자열을 URL-인코딩하는데 사용하는 내장 함수
        //  -> 특수한 의미를 가진 문자들을 대체 문자열로 변환시켜준다.
        let newUrl = `${api.GIT_URL}/public/result.html?search=${encodeURIComponent(value)}`;

        if (year) {
            newUrl += `&year=${encodeURIComponent(year)}`;
        }

        if (type) {
            newUrl += `&type=${encodeURIComponent(type)}`;
        }

        if (!value) {
            alert("검색어를 입력해주세요.");
            return;
        }

        // 페이지를 이동한다.
        window.location.href = newUrl;
    } catch (error) {
        alert("에러가 발생했습니다.");
    }
}

export function initializePage() {
    try {
        // 파라미터 값을 읽어온다.
        const searchParam = fetchSearch();
        const year = fetchYear();
        const type = fetchType();
        let page = 1;

        // 값이 있을 경우 검색 실행
        if (searchParam) {
            // 검색 결과 가져오기
            loadMovies(searchParam, year, type, page);
        }
    } catch (error) {
        alert("에러가 발생했습니다.");
    }
}

export async function getMovies(value, year, type, page) {
    try {
        if (filterEl) {
            // 결과값 초기화
            filterEl.innerHTML = "";
        }

        // encodeURIComponent 사용이유 : URI로 데이터를 정확하게 전달하기 위해서 문자열을 인코딩하기 위해 사용
        let url = `${api.BASE_URL}?apikey=${api.API_KEY}&s=${encodeURIComponent(value)}&page=${page}`;

        if (year) {
            url += `&y=${year}`;
        }

        if (type !== "all") {
            url += `&type=${type}`;
        } else if (type === "all") {
            url += `&t=${type}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.Search) {
            return data;
        } else {
            errorPage(data);
        }
    } catch (error) {
        console.error("error", error);
        alert(error.message);
    }
}

function renderMovies(movies) {

    try {
        // error영역 display:none 처리
        const errorCard = get(".wrapper-errormessage");
        errorCard.style = "display:none";
        
        // 검색결과영역 보이게 처리 후 초기화
        const itemCard = get(".itemcontainer-cardlist");
        itemCard.style = "";

        // 검색결과영역 반복문을 통해서 card 삽입
        movies.forEach((movie) => {
            // 리스트 중 한개의 카드영역을 위한 div 생성
            const movieCard = document.createElement("li");
            movieCard.className = "itemcontainer-card";

            // 고해상도 이미지로 변경
            const Highposter = getHighPoster(movie.Poster);

            // 카드영역 코드
            movieCard.innerHTML = 
            `
                <a href="${api.GIT_URL}/public/inner-view.html?id=${movie.imdbID}" class="card-item">
                    <img class="result-image" src="${Highposter}" onerror="this.src='${api.GIT_URL}/assets/images/poster-NotAvailable.png'"/>
                    <div class="result-informationBox">
                        <h2 class="informationBox-title movie-title">${movie.Title}</h2>
                        <ul class="informationBox-subList">
                            <li class="subList-item"><span class="informationBox-title type-text type-text-${movie.Type}">${movie.Type}</span></li>
                            <li class="subList-item"><span class="informationBox-title movie-year">${movie.Year}</span></li>
                        </ul>
                    </div>
                </a>
            `;
            itemCard.appendChild(movieCard);
        });
    } catch (error) {
        console.error('renderMoviesError', error);
    }

    
}

export async function loadMovies(searchParam, year, type, page) {
    try {
        const response = await getMovies(searchParam, year, type, page);
        renderMovies(response.Search);
        moreMovies(searchParam, year, type, page);
    } catch (error) {
        console.log(error.message);
    }
}

function errorPage(data) {

    try {
        // 카드 영역이 grid로 분할하였기 때문에 에러메시지 창은 grid 영역이 아닌 기존 div에 보여주기 위해 display:none처리
        const cardSection = get(".wrapper-itemcontainer");
        cardSection.style = "display:none";

        // 에러 영역을 보이게 처리 후 에러 메시지 출력
        const errorSection = get(".wrapper-errormessage");
        errorSection.style = "";
        errorSection.innerHTML = `<span class="row-title item-title">${data.Error}</span>`;

        const moreBtn = get(".itemcontainer-btn");
        moreBtn.style = "display:none";
    } catch (error) {
        console.error('errorPage: ', error);
    }
    
}

async function moreMovies(searchParam, year, type, page) {

    try {
        const response = await getMovies(searchParam, year, type, page);
        let count = response.totalResults;

        const moreBtn = get(".itemcontainer-btn");
        let countBox = get('.btn-click');

        if (count > 10) {
            moreBtn.addEventListener("click", async () => {
                page++;
                // 올림처리한다.
                let maxPage = Math.ceil(count / 10);
                const movies = await getMovies(searchParam, year, type, page);
                renderMovies(movies.Search);

                // 버튼에 현재 페이지/총페이지
                countBox.innerHTML = `${page} / ${maxPage}`
                if (page >= maxPage) { // 마지막 페이지 판별
                    moreBtn.style = "display:none";
                    console.log("last page!");
                }
            });
        } else if (count < 10) {
            moreBtn.style = "display:none";
        }
    } catch (error) {
        console.error('error', error);
    }
}