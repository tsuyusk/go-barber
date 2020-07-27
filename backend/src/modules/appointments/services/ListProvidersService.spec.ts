// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'Jhon doe',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      email: 'johntre@gmail.com',
      name: 'John Tré',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      email: 'johnqua@gmail.com',
      name: 'john qua',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
