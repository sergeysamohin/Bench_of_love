import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authRouter from "./routers/authRouter.js";
import cookieParser from "cookie-parser";
import { authMidleware } from "./midleware/authMiddleware.js";

const PORT = 8000;

// Определите конфигурацию Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API for my application",
        },
    },
    apis: ["./routers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/auth", authRouter);
app.use("/api", [authMidleware, userRouter]);
// app.use("/api", userRouter);

const DB_URL =
    "mongodb+srv://konovalovivan:Qv5G5skAXurdxIvY@bench-of-love-db.ygm5t.mongodb.net/?retryWrites=true&w=majority&appName=bench-of-love-db";

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on ${PORT}`));
        await mongoose.connect(DB_URL);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error(error);
    }
};

start();
