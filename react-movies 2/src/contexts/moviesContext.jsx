import React, { useState, useEffect } from "react";
import RemoveFromMustWatchIcon from "../components/cardIcons/remoteFromMustWatch";
import { AuthContext } from "./authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { userName, isAuthenticated } = React.useContext(AuthContext);
  
  const [favorites, setFavorites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchLater, setWatchLater] = useState([])
  const [watchHistory, setWatchHistory] = useState([])

  useEffect(() => {
    if (isAuthenticated && userName) {
      const savedHistory = localStorage.getItem(`watchHistory_${userName}`);
      setWatchHistory(savedHistory ? JSON.parse(savedHistory) : []);
    } else {
      setWatchHistory([]);
    }
  }, [userName, isAuthenticated]);

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

  const addToHistory = (movie) => {
    if (!isAuthenticated || !userName) return;

    setWatchHistory((prevHistory) => {
      const filtered = prevHistory.filter((item) => item.id !== movie.id);
      const newHistory = [
        { id: movie.id, title: movie.title, date: "Just now" },
        ...filtered
      ].slice(0, 10);

      localStorage.setItem(`watchHistory_${userName}`, JSON.stringify(newHistory));
      return newHistory;
    });
  };
  
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
        watchHistory,
        addToHistory,
      }}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;