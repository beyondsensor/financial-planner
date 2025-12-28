import { Router } from 'express';
import { TransactionController } from '../controllers/index';

const transactionRouter: Router = Router();
const transactionController = new TransactionController();

transactionRouter.get('/', transactionController.getAll);
transactionRouter.post('/', transactionController.create);

export { transactionRouter };
