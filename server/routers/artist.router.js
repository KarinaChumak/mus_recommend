import express from 'express';
import HttpStatus from 'http-status-codes';
import { artistService } from '../services';

const artistRouter = express.Router();

artistRouter.get('/', async (req, res) => {
  if (req.query.name) {
    const { name } = req.query;
    const artist = await artistService.getArtistByName(name);
    res.status(HttpStatus.OK).send(artist);
  }
  const artistList = await artistService.getArtistList();
  res.status(HttpStatus.OK).send(artistList);
})
  .post('/', async (req, res) => {
    const { name } = req.body;
    const artistData = {
      name,
    };
    const newArtist = await artistService.saveNewArtist(artistData);
    res.status(HttpStatus.CREATED).send(newArtist);
  });

export default artistRouter;
