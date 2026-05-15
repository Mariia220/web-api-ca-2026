import express from 'express';
import { getActor, getActorDetails } from '../tmdb-api';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const actor = await getActor(req.params.id);
    res.status(200).json(actor);
}));

router.get('/:id/details', asyncHandler(async (req, res) => {
    const details = await getActorDetails(req.params.id);
    res.status(200).json(details);
}));

export default router;