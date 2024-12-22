import { Router } from "express";
import {
    addUser,
    deletetUser,
    getUser,
    getUsers,
    updateUser,
} from "../controllers/userController.js";
import { check, validationResult } from "express-validator";

const userRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список пользователей
 *     parameters:
 *       - name: Any
 *         in: query
 *         description: Любое поле, представленное в схеме
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешно получен список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/api/user'
 *       404:
 *         description: Не удалось получить пользователей
 */
userRouter.get("/users", getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     parameters:
 *       - name: Any
 *         in: query
 *         description: Любое поле, представленное в схеме
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешно получен пользователь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/user'
 *       404:
 *         description: Пользователь не найден или неверный ID
 */
userRouter.get("/users/:id", getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Добавить нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/user'
 *     responses:
 *       201:
 *         description: Успешно добавлен пользователь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/api/user'
 *       400:
 *         description: Ошибка при добавлении пользователя
 */
userRouter.post(
    "/users",
    [
        check("password")
            .isLength({ min: 8})
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

    addUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Обновить пользователя по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID пользователя
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/api/user'
 *     responses:
 *       200:
 *         description: Успешно обновлён пользователь
 *       404:
 *         description: Пользователь не найден
 */
userRouter.patch(
    "/users/:id",
    [
        check("password")
            .isLength({ min: 8})
            .withMessage("Password must be between 8 and 20 characters"),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() && req.body.hasOwnProperty("password")) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    updateUser
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID пользователя
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешно удалён пользователь
 *       404:
 *         description: Пользователь не найден
 */
userRouter.delete("/users/:id", deletetUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID пользователя, выставляется АВТОМАТИЧЕСКИ
 *         name:
 *           type: string
 *           description: Имя пользователя
 *         email:
 *           type: string
 *           description: Электронная почта пользователя
 *           unique: true
 *         password:
 *           type: string
 *           description: Захешированный пароль пользователя
 *         created_at:
 *           type: string
 *           description: Дата регистрации пользователя
 *       required:
 *         - name
 *         - email
 *       unchangable:
 *         - created_at
 */

export default userRouter;
