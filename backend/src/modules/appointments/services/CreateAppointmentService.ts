import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
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

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}
  /*   private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  } */

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmeintInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se existe uma data já marcada no mesmo tempo, retorna erro
    if (findAppointmeintInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date,
      provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
