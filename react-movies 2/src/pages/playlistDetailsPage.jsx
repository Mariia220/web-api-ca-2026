import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router"; 
import { AuthContext } from "../contexts/authContext";
import { getUserPlaylists, getMovie } from "../api/tmdb-api";

const PlaylistDetailsPage = () => {
  const { id } = useParams(); 
  const { userName } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        setLoading(true);
        const allPlaylists = await getUserPlaylists(userName);
        const currentPlaylist = allPlaylists.find(p => p._id === id);
        setPlaylist(currentPlaylist);

        if (currentPlaylist && currentPlaylist.movies?.length > 0) {
          const moviePromises = currentPlaylist.movies.map(movieId => 
            getMovie({ queryKey: ["movie", { id: movieId }] })
          );
          const movieData = await Promise.all(moviePromises);
          setMovies(movieData.filter(m => m !== null));
        }
      } catch (error) {
        console.error("Error loading playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userName && id) fetchPlaylistData();
  }, [id, userName]);

  if (loading) return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;
  if (!playlist) return <div style={{ color: "white", padding: "20px" }}>Playlist not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "30px" }}>{playlist.name}</h1>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
        gap: "25px" 
      }}>
        {movies.map((movie) => (
          <Link 
            key={movie.id} 
            to={`/movies/${movie.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ 
              textAlign: "center", 
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
              <img 
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                  : "/path-to-placeholder.png"} 
                alt={movie.title}
                style={{ 
                  width: "100%", 
                  borderRadius: "10px", 
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)" 
                }}
              />
              <p style={{ 
                color: "white", 
                marginTop: "10px", 
                fontWeight: "bold",
                fontSize: "0.9rem" 
              }}>
                {movie.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {movies.length === 0 && (
        <p style={{ color: "#888" }}>This playlist is empty.</p>
      )}
    </div>
  );
};

export default PlaylistDetailsPage;