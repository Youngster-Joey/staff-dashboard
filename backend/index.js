import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
const port = 5001;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect('mongodb://localhost:27017/dashboard')
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

import { getAbout } from './modules/about/controller.js';

app.get('/about', async (req, res) => {
	const items = await getAbout();
	res.json(items);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
