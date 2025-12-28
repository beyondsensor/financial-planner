import { Request, Response, NextFunction } from 'express';
import { PortfolioService, AssetService, TransactionService } from '../services/index';
import { z } from 'zod';

const portfolioService = new PortfolioService();
const assetService = new AssetService();
const transactionService = new TransactionService();

export class PortfolioController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await portfolioService.getAll();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await portfolioService.getById(req.params.id);
            if (!result) return res.status(404).json({ message: 'Not found' });
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await portfolioService.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export class AssetController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await assetService.getAll();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await assetService.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export class TransactionController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await transactionService.getAll();
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            // Handle date conversion if necessary for transactions
            const data = {
                ...req.body,
                date: new Date(req.body.date)
            };
            const result = await transactionService.create(data);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
}
