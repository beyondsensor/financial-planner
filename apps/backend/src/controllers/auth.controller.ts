import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
    async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.json(result);
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    },

    async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
};
