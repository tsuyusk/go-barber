import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tré',
      email: 'johntré@example.com',
    });

    expect(updatedUser?.name).toBe('John Tré');
    expect(updatedUser?.email).toBe('johntré@example.com');
  });
  it('should not be able to update the user email to an already taken email', async () => {
    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johntré@gmail.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tré',
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John doe',
      email: 'johndoe@gmail.com',
      oldPassword: '123456',
      password: '123123',
    }),
      expect(user.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John doe',
        email: 'johndoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John doe',
        email: 'johndoe@gmail.com',
        password: '123123',
        oldPassword: 'wrong old password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it("should be not able to update an unexisting user's profile", async () => {
    await expect(
      updateProfile.execute({
        user_id: 'Non existing user id',
        email: 'johndoe@gmail.com',
        name: 'John doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
