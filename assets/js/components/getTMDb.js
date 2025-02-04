import api from "../base/api.js";

export async function getActorProfile(actor) {
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `${api.TMDB_KEY}`,
            },
        };

        const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${actor}&include_adult=false&language=en-US&page=1`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getMovieTMDBID(movieId) {

    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `${api.TMDB_KEY}`,
            },
        };
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-KO', options`, options);
        const data = await response.json();
        if (!data.id) {
            return null;
        }
        return data.id;
        
    } catch (error) {
        console.error('error', error);
    }
}

export async function getSimilarMovie(movieId) {

    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `${api.TMDB_KEY}`,
            },
        };
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`, options);
        const data = await response.json();
        // 2025-01-25 추가 작업
        const similarData = data.results;

        // imdb_id값 가져오기
        const getImdbID = await Promise.all(similarData.map(async (movie) => {
            const detailResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options);
            const detailData = await detailResponse.json();
            // 기존 데이터에 imdb_id값을 더한다.
            return {...movie, imdb_id: detailData.imdb_id};
        }));
        
        return getImdbID;
        
    } catch (error) {
        console.error('error', error);
    }
}

export async function getSeriesTMDBID(seriesID) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${api.TMDB_KEY}`,
        },
    };

    const response = await fetch(`https://api.themoviedb.org/3/find/${seriesID}?external_source=imdb_id`, options);
    const data = await response.json();

    if (!data.tv_results[0]) {
        return null;
    }

    return data.tv_results[0].id;
}

export async function getSimilarSeries(seriesId) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${api.TMDB_KEY}`,
        },
    };

    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/recommendations?language=en-US&page=1`, options);
    const data = await response.json();
    // 2025-01-25 추가 작업
    const similarData = data.results;
    // imdb_id값 가져오기
    const getImdbID = await Promise.all(
        similarData.map(async (movie) => {
            const detailResponse = await getSeriesIMDBID(movie.id);
            // 기존 데이터에 imdb_id값을 더한다.
            return { ...movie, imdb_id: detailResponse };
        })
    );
    return getImdbID;
    // return data.results;
}

export async function getSeriesIMDBID(seriesId) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `${api.TMDB_KEY}`,
        },
    };

    const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/external_ids`, options);
    const data = await response.json();
    return data.imdb_id;
}