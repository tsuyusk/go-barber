/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
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

  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppointmeintInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se existe uma data já marcada no mesmo tempo, retorna erro
    if (findAppointmeintInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
