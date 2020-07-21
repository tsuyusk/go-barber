import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

/**
 * Repositorio: Conexão entre a persistência dos dados e a rota
 * No repositório, podemos ter um metodo
 *  * find -> Que encontra um dado
 *  * Create -> Que cria uma informação
 * Normalmente, temos um repositório por model
 */

// Data transfer object

/* interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
 */
class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
}

export default AppointmentsRepository;
