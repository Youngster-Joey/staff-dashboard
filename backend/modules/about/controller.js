import { About } from '../../model/schema.js';

export const getAbout = async() => {
    const people = await About.find({});
    return people;
}