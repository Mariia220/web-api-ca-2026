import React, { useState } from "react";
import RemoveFromMustWatchIcon from "../components/cardIcons/remoteFromMustWatch";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchLater, setWatchLater] = useState([])
  


  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.find((m) => m.id === movie.id)) {
      setMustWatch([...mustWatch, movie]);
      console.log("Added to Must Watch:", movie.title);
    }
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter(
      (m) => m.id !== movie.id));
  };

    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
    console.log(myReviews);

  

  return (
    <MoviesContext.Provider
      value={{
        watchLater,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
      }}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
