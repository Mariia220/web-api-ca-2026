import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getMovie, getUpcomingMovies, getGenres, getMovieImages, getMovieReviews, getMovieCredits, getTopRatedMovies, getTrendingMovies, getMoviesByGenre, getSearchMovies, getActorMovieCredits } from '../tmdb-api'; 

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcoming = await getUpcomingMovies();
    res.status(200).json(upcoming);
}));


router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/toprated', asyncHandler(async (req, res) => {
    const movies = await getTopRatedMovies();
    res.status(200).json(movies);
}));

router.get('/trending', asyncHandler(async (req, res) => {
    const movies = await getTrendingMovies();
    res.status(200).json(movies);
}));

router.get('/search', asyncHandler(async (req, res) => {
    const query = req.query.query;
    const movies = await getSearchMovies(query);
    res.status(200).json(movies);
}));

router.get('/genre/:id', asyncHandler(async (req, res) => {
    const movies = await getMoviesByGenre(req.params.id);
    res.status(200).json(movies);
}));

router.get('/actor/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getActorMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found', status_code: 404 });
    }
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

export default router;

