import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export { userRouter };
