import { Router } from 'express';

import appointmentRoutes from './appointment.routes';

const routes = Router();

// Se a rota começa com /appointments, ele usa as rotas que estão no appointmentRoutes
routes.use('/appointments', appointmentRoutes);

export default routes;
