import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
  email: string;
}

class FindUserService {
  public async execute({ email }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw Error('User does not exist.');
    }

    return user;
  }
}

export default FindUserService;