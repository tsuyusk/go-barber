import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'tsuyusk@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'tsuyusk@gmail.com',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'tsuyusk@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
