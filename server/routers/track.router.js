/* eslint-disable no-underscore-dangle */
import express from 'express';
import HttpStatus from 'http-status-codes';
import { trackService, artistService } from '../services';

const trackRouter = express.Router();

trackRouter.get('/', async (req, res) => {
  const trackList = await trackService.getTrackList();
  res.status(HttpStatus.OK).send(trackList);
})
  .post('/', async (req, res) => {
    const { artistName, title, duration } = req.body;

    const artist = artistService.getArtistByName(artistName);
    const trackData = {
      artistId: artist.id,
      title,
      duration,
    };
    const newTrack = await trackService.saveNewTrack(trackData);
    res.status(HttpStatus.CREATED).send(newTrack);
  });

export default trackRouter;
