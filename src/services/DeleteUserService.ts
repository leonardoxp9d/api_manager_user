import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  email: string;
}

class DeleteUserService {
  public async execute({ email }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (!checkUserExists) {
      throw Error('User does not exist.');
    }

    await usersRepository.remove(checkUserExists);
  }
}

export default DeleteUserService;