
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import React, { useContext  } from "react";
import { MoviesContext } from "../../contexts/moviesContext";



export default function MovieCard({movie, action}) {
    const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  const handleAddToWatchLater = (e) => {
    e.preventDefault();
  };

  return (
    <Card sx={{ 
      maxWidth: 345, 
      backgroundColor: "#1e1e1e", 
      color: "white",
      borderRadius: "12px",
      transition: "transform 0.2s",
      "&:hover": { transform: "scale(1.02)", boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }
    }}>
     <CardHeader
        sx={{ height: 80, alignItems: 'start' }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: '#e91e63' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.2' }}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500, borderRadius: '4px' }}
        image={ movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
       <Grid container spacing={1} sx={{ opacity: 0.8 }}>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2">
              <StarRateIcon fontSize="small" sx={{ color: '#ffc107' }} />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
      
        {action(movie)}
      
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="medium" sx={{ 
              backgroundColor: "#141626", 
              "&:hover": { backgroundColor: "#8997ef" } 
            }}
          >
            More Info
          </Button>
        </Link>

      </CardActions>

    </Card>
  );
}
