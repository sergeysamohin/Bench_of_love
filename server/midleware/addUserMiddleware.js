import User from "../models/User.js";
import bcrypt from "bcrypt";
import { CRYPTO_ROUNDS } from "../controllers/userController.js";
import { getImagesFromFolder, handleError } from "../controllers/utils.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addUserMiddleware = async (req, res, next) => {
    try {
        const candidate = await User.findOne({ email: req.body.email });
        if (candidate) {
            return handleError(
                res,
                { message: "User with this email already exists" },
                400
            );
        }
        const hashedPassword = await bcrypt.hash(
            req.body.password,
            CRYPTO_ROUNDS
        );

        const imagesPath = path.join(__dirname, "..", "public", "images");
        const images = await getImagesFromFolder(imagesPath);
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const relativePath = path.relative(
            path.join(__dirname, "..", "public"),
            randomImage
        );

        const user = new User({ ...req.body, profileImage: relativePath, password: hashedPassword });
        const savedUser = await user.save();

        req.user = savedUser;
        next();
    } catch (err) {
        handleError(res, err, 400);
    }
};
