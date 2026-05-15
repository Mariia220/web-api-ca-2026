import fetch from 'node-fetch';

export const getMovie = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};
