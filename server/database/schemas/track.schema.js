import { Schema } from 'mongoose';

const trackSchema = new Schema({
  title: { type: String, required: true },
  artistId: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  duration: { type: Number, required: true },
  bpm: { type: Number, required: false },
});

export default trackSchema;
