import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router"; 
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import { getUserPlaylists, addMovieToPlaylist } from "../../api/tmdb-api";
import { 
  Card, CardActions, CardContent, CardMedia, CardHeader, 
  Button, Typography, Avatar, MenuItem, Select, FormControl, InputLabel 
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from '../../images/film-poster-placeholder.png';

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);
  const { userName, isAuthenticated } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isAuthenticated && userName) {
      getUserPlaylists(userName).then((data) => setPlaylists(data || []));
    }
  }, [isAuthenticated, userName]);


  const handleAddClick = async () => {
    if (!selectedPlaylist) {
      alert("Please select a playlist first!");
      return;
    }

    try {
      await addMovieToPlaylist(userName, selectedPlaylist, movie.id);
      alert(`Success! "${movie.title}" added to playlist.`);
      setSelectedPlaylist(""); 
    } catch (error) {
      console.error("Error adding to playlist:", error);
      alert("Failed to add movie.");
    }
  };

  const isFavorite = favorites.find((id) => id === movie.id);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1e1e1e", color: "white", borderRadius: "12px" }}>
      <CardHeader
        avatar={isFavorite ? <Avatar sx={{ backgroundColor: '#e91e63' }}><FavoriteIcon /></Avatar> : null}
        title={<Typography variant="h6" sx={{ fontSize: '1rem', color: 'white' }}>{movie.title}</Typography>}
      />
      <CardMedia
        sx={{ height: 500 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
      />
      <CardContent>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarIcon fontSize="small" /> {movie.release_date}
          <StarRateIcon fontSize="small" sx={{ color: '#ffc107', ml: 2 }} /> {movie.vote_average}
        </Typography>

        {isAuthenticated && (
          <>
            <FormControl fullWidth size="small" sx={{ mt: 1, backgroundColor: "#333", borderRadius: "4px" }}>
              <InputLabel sx={{ color: "#aaa" }}>Choose Playlist</InputLabel>
              <Select
                value={selectedPlaylist}
                label="Choose Playlist"
                onChange={(e) => setSelectedPlaylist(e.target.value)} 
                sx={{ color: "white" }}
              >
                {playlists.map((list) => (
                  <MenuItem key={list._id} value={list._id}>{list.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              fullWidth 
              variant="contained" 
              size="small" 
              onClick={handleAddClick} 
              sx={{ mt: 1, backgroundColor: "#e91e63", "&:hover": { backgroundColor: "#c2185b" } }}
            >
              Add to Playlist
            </Button>
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="contained" size="small" sx={{ backgroundColor: "#3f51b5" }}>More Info</Button>
        </Link>
      </CardActions>
    </Card>
  );
}