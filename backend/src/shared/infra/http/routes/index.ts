import { Router } from 'express';

import appointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

// Se a rota começa com /appointments, ele usa as rotas que estão no appointmentRoutes
routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/passwords', passwordRoutes);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
