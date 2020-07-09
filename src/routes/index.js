import { Router } from 'express';

import cieloController from '../app/controllers/cerditCardController';
import operatorMiddleware from '../app/middlewares/operator';

const routes = new Router();

routes.get('/ping', async (req, res) => {
  res.send('Pong!');
});

routes.post(
  '/:operator/credit-card',
  operatorMiddleware,
  cieloController.store
);
routes.put(
  '/:operator/:establishment/credit-card/:paymentid',
  operatorMiddleware,
  cieloController.capture
);
routes.delete(
  '/:operator/:establishment/credit-card/:paymentid',
  operatorMiddleware,
  cieloController.delete
);

routes.get(
  '/:operator/:establishment/credit-card/:paymentid',
  operatorMiddleware,
  cieloController.show
);
export default routes;
