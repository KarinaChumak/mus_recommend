/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { Track, Artist } from '../database/models';
import NotFoundError from '../error/not-found.error';

async function getTrackList() {
  const artistList = await Artist.find();
  if (!artistList) {
    throw new NotFoundError('Artists not found');
  } else {
    return artistList;
  }
}
async function saveNewTrack(trackData) {
  const track = new Track(trackData);
  const newTrack = await track.save();
  return newTrack;
}

export {
  getTrackList,
  saveNewTrack,
};
