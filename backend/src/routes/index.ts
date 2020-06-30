import { Router } from 'express';

import appointmentRoutes from './appointment.routes';
import userRouter from './users.routes';
import sessionRouter from './session.routes';

const routes = Router();

// Se a rota começa com /appointments, ele usa as rotas que estão no appointmentRoutes
routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
