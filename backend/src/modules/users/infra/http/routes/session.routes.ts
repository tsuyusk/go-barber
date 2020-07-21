import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
