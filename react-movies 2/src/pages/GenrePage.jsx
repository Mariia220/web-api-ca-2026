import React from "react";
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getMoviesByGenre } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';



const GenrePage = () => {
  const { id } = useParams(); 

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genre", { id: id }],
    queryFn: getMoviesByGenre,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title={`Genre Movies`}
      movies={movies}
      action={(movie) => {
       return <AddToMustWatchIcon movie={movie} />
      }}
    />
  );
};

export default GenrePage;