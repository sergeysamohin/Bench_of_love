import { Schema, mongoose } from "mongoose";

const storySchema = new Schema(
    {
        title: { type: String, required: true },
        text: String,
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default storySchema;
