import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import GenrePage from "./pages/GenrePage";
import SearchPage from "./pages/SearchPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import StartPage from "./pages/startPage";
import ProfilePage from "./pages/profilePage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
import CreatePlaylistPage from "./pages/createPlaylistPage";
import PlaylistDetailsPage from "./pages/playlistDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthContextProvider>
        <SiteHeader />
          <MoviesContextProvider>
            <Routes>
            <Route path="/" element={< StartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route element={<ProtectedRoutes />}>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/watchlater" element={<WatchLaterPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/genres/:id" element={<GenrePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/playlists/create" element={<CreatePlaylistPage />} />
            <Route path="/playlists/:id" element={<PlaylistDetailsPage />} />
            </Route>
            <Route path="*" element={ <Navigate to="/" /> } />
          </Routes>
        </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

export default App;
