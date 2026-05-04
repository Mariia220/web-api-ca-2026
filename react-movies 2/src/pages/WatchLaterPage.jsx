import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromMustWatch from "../components/cardIcons/remoteFromMustWatch";
import WriteReview from "../components/cardIcons/writeReview";

const WatchLaterPage = () => {
  
  const { mustWatch: movies } = useContext(MoviesContext);


return (
    <PageTemplate
      title="Watch Later Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatch movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};
export default WatchLaterPage;