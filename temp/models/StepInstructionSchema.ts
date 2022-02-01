import mongoose from "mongoose";

export interface StepInstructionType {
    text: String;
    image?: String;
}

export const StepInstructionSchema = new mongoose.Schema<StepInstructionType>({
    text: { type: String, required: true, minlength: 10, maxlength: 500 },
    image: String,
});

const StepInstruction = mongoose.model(
    "StepInstruction",
    StepInstructionSchema
);
export default StepInstruction;
