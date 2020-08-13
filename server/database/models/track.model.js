import mongoose from 'mongoose';
import trackSchema from '../schemas/track.schema';

const Track = mongoose.model('Track', trackSchema);

export default Track;
