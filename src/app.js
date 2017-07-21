import express from 'express';

import './configs/db';

import middlewaresConfig from './configs/middlewares';
import apiRoutes from './modules'; 

const app = express();

middlewaresConfig(app);
apiRoutes(app);

export default app;