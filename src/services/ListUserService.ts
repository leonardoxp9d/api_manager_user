import { getRepository } from 'typeorm';

import User from '../models/User';

class CreateUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const allUsers = await usersRepository.find();

    if (allUsers.length == 0) {
      throw Error('No registered users.');
    }

    return allUsers;
  }
}

export default CreateUserService;