import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { Link } from "react-router";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, credits }) => {  // Don't miss this!
  console.log("Movie data:", movie);
  console.log("Credits data:", credits);
const [drawerOpen, setDrawerOpen] = useState(false);


  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Typography variant="h6" component="p">
        Production Countries
      </Typography>

      <Paper component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
         </li>
             {movie.genres.map((g) => (
             <li key={g.name}>
             <Link to={`/genres/${g.id}`} style={{ textDecoration: 'none' }}>
             <Chip label={g.name} sx={{...chip}} clickable />
             </Link>
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      
      <Paper 
        component="ul" 
        sx={{...root}}
      >
          <li>
            <Link to={`/movies/${movie.id}/recommendations`} style={{ textDecoration: 'none' }}>
              <Chip label="Recommended Movies" sx={{...chip}} color="warning" clickable/>
            </Link>
          </li>
        </Paper>



      <Paper component="ul" sx={{...root}}>
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
        Main Cast
      </Typography>

      <Paper component="ul" sx={{...root, gap: 2}}>
  {credits && credits.cast ? (
    credits.cast.slice(0, 6).map((actor) => (
      <li key={actor.id} style={{ textAlign: 'center', listStyle: 'none' }}>
        <Link to={`/actors/${actor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img 
            src={actor.profile_path 
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` 
              : "https://via.placeholder.com/100x150?text=No+Photo"} 
            alt={actor.name}
            style={{ width: '80px', height: '120px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
            {actor.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {actor.character}
          </Typography>
        </Link>
      </li>
    ))
  ) : (
    <Typography>Loading cast...</Typography>
  )}
</Paper>
            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};
export default MovieDetails ;
