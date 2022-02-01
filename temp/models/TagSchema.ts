import mongoose from "mongoose";

export interface TagType {
    title: string;
}

const tagSchema = new mongoose.Schema<TagType>({
    title: { type: String, required: true, unique: true },
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
