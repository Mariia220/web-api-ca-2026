import React, { useEffect, useState } from 'react';
import { getUserPlaylists } from '../api/tmdb-api';
import MovieList from '../components/movieList'; 

const PlaylistsPage = ({ username }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists(username).then(data => setPlaylists(data));
  }, [username]);

  return (
    <div>
      <h2>Мої тематичні списки</h2>
      {playlists.map(list => (
        <div key={list._id}>
          <h3>{list.name} ({list.movies.length} фільмів)</h3>
          <MovieList movies={list.movies} />
        </div>
      ))}
    </div>
  );
};