import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { z } from 'zod';

const userService = new UserService();

const createUserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
});

export class UserController {
    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Retrieve a list of users
     *     responses:
     *       200:
     *         description: A list of users.
     */
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: A user object.
     *       404:
     *         description: User not found.
     */
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Create a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *               email:
     *                 type: string
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: User created.
     */
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedData = createUserSchema.parse(req.body);
            const newUser = await userService.create(validatedData);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedUser = await userService.update(req.params.id, req.body);
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await userService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
