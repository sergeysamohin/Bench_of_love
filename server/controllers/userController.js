import mongoose from "mongoose";
import User from "../models/User.js";
import { handleError, parseQueryParams } from "./utils.js";
import bcrypt from "bcrypt";

export const CRYPTO_ROUNDS = 10;

export const getUsers = (req, res) => {
    const query = parseQueryParams(req.query);
    User.countDocuments().then((count) => {
        if (count === 0) {
            return handleError(
                res,
                { message: "Database is still empty" },
                404
            );
        } else {
            User.find(query)
                .sort({ updated_at: -1 })

                .then((users) => {
                    if (!users.length)
                        return handleError(
                            res,
                            {
                                message:
                                    "Users with this parameters do not found",
                            },
                            404
                        );
                    return res.status(200).json(users);
                })
                .catch((err) => handleError(res, err, 404));
        }
    });
};

export const getUser = (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return handleError(res, { message: "Cast to ObjectId failed" }, 404);
    }
    const query = { ...parseQueryParams(req.query), _id: req.params.id };

    User.findOne(query)
        ?.sort({ updated_at: 1 })
        .then((user) => {
            if (!user)
                handleError(
                    res,
                    { message: "User with this parameters does not found" },
                    404
                );
            return res.status(200).json(user);
        })
        .catch((err) => handleError(res, err, 404));
};

export const addUser = async (req, res) => {
    bcrypt
        .hash(req.body.password, CRYPTO_ROUNDS)
        .then((hashedPassword) => {
            const user = new User({ ...req?.body, password: hashedPassword });
            return user.save();
        })
        .then((result) => {
            return res.status(201).json(result);
        })
        .catch((err) => handleError(res, err, 400));
};

export const deletetUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => handleError(res, err, 404));
};

export const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(
                req.body.password,
                CRYPTO_ROUNDS
            );
        }

        const existingUser = await User.findById(req.params.id);
        if (req.body.story) {
            existingUser.story = {
                ...existingUser.story,
                ...req.body.story,
            };
            existingUser.save();
        }

        const updateData = { ...req.body };
        delete updateData.story;

        const result = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(result);
    } catch (err) {
        // console.error(err);
        handleError(res, err);
    }
};
