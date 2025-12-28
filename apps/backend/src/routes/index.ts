import { Router } from 'express';
import { userRouter } from './users';
import { portfolioRouter } from './portfolios';
import { assetRouter } from './assets';
import { transactionRouter } from './transactions';
import { authRouter } from './auth';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/portfolios', portfolioRouter);
router.use('/assets', assetRouter);
router.use('/transactions', transactionRouter);

export { router };
