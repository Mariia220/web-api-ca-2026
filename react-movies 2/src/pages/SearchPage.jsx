import React from "react";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getSearchMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const SearchPage = () => {
  const { query } = useParams(); 

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query: query }],
    queryFn: getSearchMovies,
    enabled: !!query, 
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title={`Results for: ${query}`}
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default SearchPage;