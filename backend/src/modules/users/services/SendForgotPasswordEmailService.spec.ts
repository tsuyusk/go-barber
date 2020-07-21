import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using user email.', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });
  it('Should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should generate a forgot password token', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
