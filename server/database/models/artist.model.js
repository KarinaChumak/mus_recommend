import mongoose from 'mongoose';
import artistSchema from '../schemas/artist.schema';

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
