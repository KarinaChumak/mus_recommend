import { Schema } from 'mongoose';

const artistSchema = new Schema({
  name: { type: String, required: true },
});

export default artistSchema;
