import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUserTokensRepository implements IUsersTokensRepository {
  private userTokens: UserToken[] = [];
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      user_id,
      token: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.unshift(userToken);

    return userToken;
  }
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
