export const getMovies = () => {
  return fetch(
    'http://localhost:8080/api/movies'
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};


export const getMovie = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};



  export const getGenres = () => {
    return fetch(
      `http://localhost:8080/api/movies/genres`
    ).then((response) => {
      if (!response.ok) {
          throw new Error(error.status_message || "Something went wrong");
        }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
     `http://localhost:8080/api/movies/${id}/images`
    ).then((response) => {
      if (!response.ok) {
          throw new Error(error.status_message || "Something went wrong");
        }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `http://localhost:8080/api/movies/${id}/reviews`
    ).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

export const getUpcomingMovies = () => {
  return fetch(
    `http://localhost:8080/api/movies/upcoming`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};


export const getActor = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/actors/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};

export const getActorDetails = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/actors/${id}/details`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};

export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/${id}/credits`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error;
  });
};

export const getActorMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch( 
    `http://localhost:8080/api/movies/actor/${id}/credits`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch movie credits");
    }
    return response.json();
  });
};


export const getMoviesByGenre = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `http://localhost:8080/api/movies/genre/${id}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch movies by genre");
    }
    return response.json();
  });
};

export const getSearchMovies = ({ queryKey }) => {
  const [, queryPart] = queryKey;
  const { query } = queryPart;
  return fetch(
   `http://localhost:8080/api/movies/search?query=${query}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    return response.json();
  });
};

export const getTopRatedMovies = () => {
  return fetch(
   'http://localhost:8080/api/movies/toprated'
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch top rated movies");
    }
    return response.json();
  });
};

export const getTrendingMovies = () => {
  return fetch(
   'http://localhost:8080/api/movies/trending'
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch trending movies");
    }
    return response.json();
  });
};

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};
