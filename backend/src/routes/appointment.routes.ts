/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// Midlewares
import ensureAuthenticated from '../middlewares/ensureAuthentication';

// Importamos a entidade Appointment para criar-la posteriormente
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

/**
 * SOLID
 * Single Responsibility Principle -> Cada classe deve ter apenas uma responsabilidade
 *
 * Dependency Inversion Principle ->
 */

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // Transforma a data em Date
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  // Regra de negócio -> Em services
  return response.json(appointment);
});

export default appointmentsRouter;
