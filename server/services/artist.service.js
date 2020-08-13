import { Artist } from '../database/models';
import NotFoundError from '../error/not-found.error';

async function getArtistByName(artistName) {
  const artist = await Artist.findOne({ name: artistName });
  if (!artist) {
    throw new NotFoundError(`Artist ${artistName} not found`);
  } else {
    return artist;
  }
}

async function getArtistList() {
  const artistList = await Artist.find();
  if (!artistList) {
    throw new NotFoundError('Artists not found');
  } else {
    return artistList;
  }
}

async function saveNewArtist(artistData) {
  const artist = new Artist(artistData);
  const newArtist = await artist.save();
  return newArtist;
}

export {
  getArtistList,
  getArtistByName,
  saveNewArtist,
};
