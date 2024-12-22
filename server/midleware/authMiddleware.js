import jwt from "jsonwebtoken";
import { SECRET } from "../controllers/authController.js";

export const authMidleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Access denied" });
            }
        });
        next();
    } catch (error) {
        return res.status(401);
    }
};