import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    // Transforma a data em Date
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    // Regra de negócio -> Em services
    return response.json(appointment);
  }
}
