import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    showProfile = new ShowProfileService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const showedUser = await showProfile.execute({ user_id: user.id });

    expect(showedUser).toBe(user);
  });
  it("should be not able to show an unexisting user's profile", async () => {
    await expect(
      showProfile.execute({ user_id: 'Non existing user id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
