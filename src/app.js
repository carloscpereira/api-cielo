import 'dotenv/config';

import express from 'express';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import cors from 'cors';

import 'express-async-errors';

import { checkAuthorization } from './app/middlewares';

import routes from './routes';
import sentryConfig from './config/sentry';
import corsConfig from './config/cors';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(cors(corsConfig));
    this.server.use(checkAuthorization);
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    const isDev = process.env.NODE_ENV !== 'production';

    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      if (isDev) {
        return res.status(500).json(errors);
      }

      return res
        .status(500)
        .json({ error: 500, data: { message: 'Internal Server Error' } });
    });
  }
}

export default new App().server;
