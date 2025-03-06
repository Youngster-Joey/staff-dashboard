import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true 
    },
    last_name: {
        type: String,
        required: true
    },
    alumni: {
        type: Boolean,
        required: true
    }
});

export const About = mongoose.model('About', aboutSchema, 'about');
