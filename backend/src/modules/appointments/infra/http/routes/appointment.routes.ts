/* eslint-disable camelcase */
import { Router } from 'express';

// Midlewares
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import AppointmentsContoller from '../controllers/AppointmentsController';

// Importamos a entidade Appointment para criar-la posteriormente

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentsContoller();

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
