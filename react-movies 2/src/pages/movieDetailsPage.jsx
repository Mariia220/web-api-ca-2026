import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie, getMovieCredits } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   Redundant


const MoviePage = (props) => {
  const { id } = useParams();
    const { data: movie, error: mError, isPending: moviePending, isError: movieError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  const { data: credits, isPending: creditsPending } = useQuery({
    queryKey: ['credits', { id: id }],
    queryFn: getMovieCredits, 
  });

  if ( moviePending || creditsPending) {
    return <Spinner />;
  }

  if (movieError) {
    return <h1>{mError.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} credits={credits} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
