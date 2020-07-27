// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderMonthAvailablityService from './ListProviderMonthAvailablityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailablity: ListProviderMonthAvailablityService;

describe('ListProviderMonthAvailablity', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailablity = new ListProviderMonthAvailablityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availablity from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 22, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user2',
      date: new Date(2020, 6, 24, 10, 0, 0),
    });

    // UTC -3 -> UTC + 0 -> 8 + 3 -> 11

    const availablity = await listProviderMonthAvailablity.execute({
      provider_id: 'user',
      year: 2020,
      month: 7,
    });

    expect(availablity).toEqual(
      expect.arrayContaining([
        {
          day: 22,
          available: false,
        },
        {
          day: 24,
          available: true,
        },
      ]),
    );
  });
});
