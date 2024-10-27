import mongoose from 'mongoose';
import pkg from 'mongoose-sequence';  // Import AutoIncrement
const AutoIncrement = pkg(mongoose);

const genreSchema = new mongoose.Schema({
    genreId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
}, { timestamps: true });
genreSchema.plugin(AutoIncrement, { inc_field: 'genreId', start_seq: 1 });

export const Genre = mongoose.model('Genre', genreSchema);
