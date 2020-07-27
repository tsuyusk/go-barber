import { Request, Response } from 'express';

// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsContoller {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    // Transforma a data em Date
    // ! Sem necessidade de converter, já que já convertemos quando usamos Joi.date()
    // const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    // Regra de negócio -> Em services
    return response.json(appointment);
  }
}
