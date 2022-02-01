import express from 'express';
import { getRecipe } from './recipeRoutes';
const rateRecipesRouter = express.Router({ mergeParams: true });

rateRecipesRouter.post('/:rating', getRecipe, async (req, res: any) => {
    const rating = parseInt(req.params.rating);

    try {
        res.recipe.rating = rating;
        const result = await res.recipe.save();
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

rateRecipesRouter.delete('/', getRecipe, async (req, res: any) => {
    try {
        res.recipe.rating = undefined;
        const result = await res.recipe.save();
        res.json(result);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default rateRecipesRouter;
