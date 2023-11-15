import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Route to get a user by ID
userRouter.get('/:userId', userController.getUserByIdHandler);

// Route to create a new user
userRouter.post('/', userController.createUserHandler);

// Route to update a user
userRouter.put('/:userId', userController.updateUserHandler);

// Route to delete a user
userRouter.delete('/:userId', userController.deleteUserHandler);

export default userRouter;
