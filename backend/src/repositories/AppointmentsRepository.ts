import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

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
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /*   private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  */
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Percorre todos os agendamentos e verifica se a data que foi recebida ja existe
    /*     const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    */

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
  /*
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    // Cria um appointment
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  } */
}

export default AppointmentsRepository;
