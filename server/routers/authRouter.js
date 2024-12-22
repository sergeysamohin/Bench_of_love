import Router from "express";
import {
    login,
    logout,
    registration,
    authenticateToken,
} from "../controllers/authController.js";
import { check, validationResult } from "express-validator";
import { addUserMiddleware } from "../midleware/addUserMiddleware.js";

const authRouter = new Router();

authRouter.post(
    "/registration",
    [
        check("password")
            .isLength({ min: 8 })
            .withMessage("Password must be between 8 and 20 characters"),
        check("email", "Email can not be empty").notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    addUserMiddleware,
    registration
);
authRouter.post(
    "/login",
    [
        check("password")
            .isLength({ min: 8 })
            .withMessage("Password must be between 8 and 20 characters"),
        check("email", "Email can not be empty").notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    login
);
authRouter.get("/check-token", authenticateToken);
authRouter.post('/logout', logout);

export default authRouter;
