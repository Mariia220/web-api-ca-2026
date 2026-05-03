import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';


const formControl = 
  {
    margin: 1,
  minWidth: "90%",
  backgroundColor: "rgba(255, 255, 255, 0.05)", 
  borderRadius: "4px"
  };

export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };



  return (
    <Card 
      sx={{
        backgroundColor: "#1e1e1e", 
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        position: "sticky",
        top: "80px"
      }}
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SearchIcon/>
          Filter Movies
        </Typography>
        <TextField
      sx={{
            ...formControl,
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" }
          }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
    />
        <FormControl sx={{
          ...formControl,
          "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          "& .MuiSelect-select": { color: "white" }
        }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 200, opacity: 0.6 }} image={img} title="Filter" />
    </Card>
  );
}
