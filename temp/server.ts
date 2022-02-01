import express from 'express';
import mongoose from 'mongoose';
import recipeRoutes from './routes/recipeRoutes';
import tagRoutes from './routes/tagRoutes';
import { config } from 'dotenv';
import rateRecipesRouter from './routes/rateRecipes';

config();

const app = express();

mongoose
    .connect(
        process.env.CONNECTION_STRING || 'mongodb://localhost:27017/recipes'
    )
    .then(() => console.log('connected to db'))
    .catch((err) => console.error(err));

app.use(express.json());

// routes
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/rate', rateRecipesRouter);
app.use('/tags', tagRoutes);

app.listen(3000, () => console.log('connected to express'));
