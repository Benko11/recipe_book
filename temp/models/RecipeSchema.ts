import mongoose, { Types } from "mongoose";
import StepInstruction, {
    StepInstructionSchema,
    StepInstructionType,
} from "./StepInstructionSchema";

export interface RecipeType {
    name: String;
    image?: String;
    tags: Types.ObjectId[];
    ingredients?: String[];
    instructions?: StepInstructionType[];
    link?: String;
    rating?: Number;
    cookTime: Number;
}

const recipeSchema = new mongoose.Schema<RecipeType>({
    name: { type: String, required: true, minlength: 3 },
    image: String,
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tag" }],
    ingredients: [String],
    instructions: [{ type: StepInstructionSchema }],
    link: String,
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    cookTime: { type: Number, min: 1, max: 1440 },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
