import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'john doe',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });
  it("should not be able to update a non existing user's avatar", async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'Non existing user',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when the user updates the current one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'john doe',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
