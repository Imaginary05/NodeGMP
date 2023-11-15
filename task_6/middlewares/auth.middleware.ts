import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import {User} from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export function authenticationMiddleware(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.header('x-user-id');

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Missing x-user-id header' });
        }

        try {
            const user = await userService.getUserById(userId);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            req.user = user;
            next();
        } catch (error: any) {
            console.error('Authentication middleware error:', error.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}
