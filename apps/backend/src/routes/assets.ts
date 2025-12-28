import { Router } from 'express';
import { AssetController } from '../controllers/index';

const assetRouter: Router = Router();
const assetController = new AssetController();

assetRouter.get('/', assetController.getAll);
assetRouter.post('/', assetController.create);

export { assetRouter };
