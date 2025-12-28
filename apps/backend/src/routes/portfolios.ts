import { Router } from 'express';
import { PortfolioController } from '../controllers/index';

const portfolioRouter: Router = Router();
const portfolioController = new PortfolioController();

portfolioRouter.get('/', portfolioController.getAll);
portfolioRouter.get('/:id', portfolioController.getById);
portfolioRouter.post('/', portfolioController.create);

export { portfolioRouter };
