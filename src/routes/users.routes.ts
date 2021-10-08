import { Router } from 'express';
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import FindUserService from '../services/FindUserService';
import UpdateUserService from '../services/UpdateUserService';
import DeleteUserService from '../services/DeleteUserService';


const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', async (request, response) => {
  try {
    const listUser = new ListUserService();

    const allUsers = await listUser.execute();

    return response.json(classToClass(allUsers));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/findUser', async (request, response) => {
  try {
    const { email } = request.body;
    
    const findeUser = new FindUserService();

    const user = await findeUser.execute({
      email,
    });

    return response.json(classToClass(user));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.put('/', async (request, response) => {
  try {

    const { name, email, password } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.delete('/', async (request, response) => {
    try {
      const { email } = request.body;
  
      const deleteUser = new DeleteUserService();
  
      await deleteUser.execute({
        email,
      });
  
      return response.json({ message: 'User deleted successfully'});
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  });

export default usersRouter;