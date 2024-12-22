import { Schema, model } from "mongoose";
import storySchema from "./Story.js";

const IMMUTABLE_RECORDS = ["created_at", "updated_at", "role"];

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        story: { type: storySchema, required: true },
        avatar_img_src: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
        profileImage: {
            type: String,
            default: "images/avatar1.png",
        },
    },
    { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
    if (this.isModified()) {
        this.updated_at = Date.now();
    }
    next();
});

userSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    const notImmutableRecords = Object.keys(update).filter((value) =>
        IMMUTABLE_RECORDS.includes(value)
    );

    if (notImmutableRecords.length) {
        const error = new Error();
        error.statusCode = 403;
        error.message = `Can not change such fields as: ${notImmutableRecords.join(
            ", "
        )}`;
        next(error);
    }

    next();
});

const User = model("User", userSchema);

export default User;
