import { Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;
    public router: Router;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Add your routes here
        this.router.get('/:userId', this.getUserByIdHandler);
        this.router.post('/', this.createUserHandler);
        this.router.put('/:userId', this.updateUserHandler);
        this.router.delete('/:userId', this.deleteUserHandler);
        // Add more routes as needed
    }
    // Function to get a user by ID
    getUserByIdHandler = (req: Request, res: Response) => {
        const userId = req.params.userId;
        const user = this.userService.getUserById(userId);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    };

    // Function to create a new user
    createUserHandler = (req: Request, res: Response) => {
        try {
            const { name, email /* other properties */ } = req.body;
            const newUser = this.userService.createUser({ name, email /* other properties */ });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Function to update a user
    updateUserHandler = (req: Request, res: Response) => {
        try {
            const userId = req.params.userId;
            const { name, email /* other properties */ } = req.body;

            const updatedUser = this.userService.updateUser(userId, { name, email /* other properties */ });

            if (updatedUser) {
                return res.status(200).json(updatedUser);
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    // Function to delete a user
    deleteUserHandler = (req: Request, res: Response) => {
        const userId = req.params.userId;
        const deleted = this.userService.deleteUser(userId);

        if (deleted) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    };
}
