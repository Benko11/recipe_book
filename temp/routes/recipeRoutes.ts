import express from 'express';
import Recipe from '../models/RecipeSchema';
const recipeRoutes = express.Router();

interface RequestBody {
    name: string;
    image: string;
    tags: string[];
    ingredients: string[];
    instructions: string[];
    link: string;
    rating: number;
    cookTime: number;
}

recipeRoutes.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

recipeRoutes.get('/:id', getRecipe, async (req, res: any) => {
    res.json(res.recipe);
});

recipeRoutes.post('/', async (req, res) => {
    const requestBody = req.body as RequestBody;
    const {
        name,
        image,
        tags,
        ingredients,
        instructions,
        link,
        rating,
        cookTime,
    } = requestBody;

    try {
        const newRecipe = await Recipe.create({
            name,
            image,
            tags,
            ingredients,
            instructions,
            link,
            rating,
            cookTime,
        });

        res.status(201).json(newRecipe);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

recipeRoutes.delete('/:id', getRecipe, async (req, res: any) => {
    try {
        await res.recipe.remove();
        res.json({ message: 'Recipe deleted' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

export default recipeRoutes;

export async function getRecipe(req: any, res: any, next: any) {
    let recipe;
    try {
        recipe = await Recipe.findById(req.params.id);
        if (recipe == null) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
    res.recipe = recipe;

    next();
}
