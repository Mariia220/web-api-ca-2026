import fetch from 'node-fetch';

const handleTMDBError = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.status_message || "Something went wrong");
    }
    return await response.json();
};

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );
    return handleTMDBError(response);
};


export const getMovie = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getUpcomingMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getGenres = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }
    
    return await response.json();
};

export const getMovieImages = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getTopRatedMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};

export const getTrendingMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_KEY}`
    );
    return handleTMDBError(response);
};

export const getMovieReviews = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
    );
    return handleTMDBError(response);
};

export const getMovieCredits = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    return handleTMDBError(response);
};

export const getMoviesByGenre = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&with_genres=${id}`
    );
    return handleTMDBError(response);
};

export const getSearchMovies = async (query) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=1`
    );
    return handleTMDBError(response);
};

export const getActor = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    return handleTMDBError(response);
};

export const getActorMovieCredits = async (id) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
    );
    return handleTMDBError(response);
};

export const addMovieToPlaylist = (username, playlistId, movieId) => {
  return fetch(`http://localhost:8080/api/users/${username}/playlists/${playlistId}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId: movieId }) 
  }).then(res => {
    if (!res.ok) throw new Error("Failed to add movie");
    return res.json();
  });
};

export const deletePlaylist = (username, playlistId) => {
  return fetch(`http://localhost:8080/api/users/${username}/playlists/${playlistId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    if (!res.ok) throw new Error("Failed to delete playlist");
    return res.json();
  });
};