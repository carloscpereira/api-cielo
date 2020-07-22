import { Router } from 'express';

import { checkOperator as operatorMiddleware } from '../app/middlewares';

import cieloController from '../app/controllers/cerditCardController';
import establishmentController from '../app/controllers/establishmentController';

const routes = new Router();

routes.get('/ping', async (req, res) => {
  res.send('Pong!');
});

routes.post(
  '/credit-card/:operator',
  operatorMiddleware,
  cieloController.store
);

routes.delete(
  '/credit-card/:operator/:paymentid',
  operatorMiddleware,
  cieloController.delete
);

routes.post(
  '/credit-card/:operator/:establishment',
  operatorMiddleware,
  establishmentController.store
);

routes.put(
  '/credit-card/:operator/:establishment/:paymentid',
  operatorMiddleware,
  establishmentController.capture
);

routes.delete(
  '/credit-card/:operator/:establishment/:paymentid',
  operatorMiddleware,
  establishmentController.delete
);

routes.get(
  '/credit-card/:operator/:establishment/:paymentid',
  operatorMiddleware,
  establishmentController.show
);

export default routes;
