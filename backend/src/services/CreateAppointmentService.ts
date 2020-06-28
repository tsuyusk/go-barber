import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

/**
 * Dependency inversion
 * -> Sempre que o service tiver uma dependência externa,
 * Ao invés de instanciarmos essa classe, vamos receber essa classe como
 * um parâmetro da nossa classe.
 *
 * Isso faz com que todos os services usem o mesmo Repository
 */

class CreateAppointmentService {
  /*   private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  } */

  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmeintInSameDate = appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se existe uma data já marcada no mesmo tempo, retorna erro
    if (findAppointmeintInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
