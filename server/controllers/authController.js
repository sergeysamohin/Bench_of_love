import { authMidleware } from "../midleware/authMiddleware.js";
import User from "../models/User.js";
import { handleError } from "./utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const SECRET = "SuperSecretKey";

export const registration = async (req, res) => {
    try {
        if (!req.user) {
            return handleError(res, { message: "User creation failed" }, 400);
        }

        const token = jwt.sign({ id: req.user._id }, SECRET, {
            expiresIn: "24h",
        });

        res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
        res.status(201).json({
            message: "User registered successfully",
            user: req.user,
        });
    } catch (error) {
        const { email } = req.user;
        await User.findOneAndDelete({ email });
        return handleError(res, { message: "Registration Error" }, 400);
    }
};

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const candidate = await User.findOne({ email });
        if (!candidate) {
            handleError(
                res,
                {
                    message:
                        "User with this email and password does not exists",
                },
                404
            );
            return;
        }
        const isMatch = await bcrypt.compare(
            req.body.password,
            candidate.password
        );
        if (!isMatch) {
            return handleError(res, { message: "Invalid password" }, 400);
        }

        const token = jwt.sign({ id: candidate._id }, SECRET, {
            expiresIn: "24h",
        });
        res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
        res.status(200).json(candidate);
    } catch (error) {
        console.error(error);
        handleError(res, { message: error }, 400);
    }
};

export const authenticateToken = async (req, res, next) => {
    try {
        authMidleware(req, res, next);
        return res.status(200).json({ message: "Authorized" });
    } catch (error) {
        return res.status(401);
    }
};

export const logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });

    res.status(200).json({ message: "Logged out successfully" });
};
