import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const { filename } = request.file;
    const { id } = request.user;

    const user = await updateUserAvatar.execute({
      user_id: id,
      filename,
    });

    delete user.password;

    return response.json(user);
  }
}
