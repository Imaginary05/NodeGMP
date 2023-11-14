import { User } from '../models/user.model';

export class UserRepository {
    private users: User[] = [];

    // Function to get a user by ID
    getById = (userId: string): User | null => {
        return this.users.find((user) => user.id === userId) || null;
    };

    // Function to create a new user
    create = (user: Omit<User, 'id'>): User => {
        const id = String(this.users.length + 1);
        const newUser: User = { id, ...user };
        this.users.push(newUser);
        return newUser;
    };

    // Function to update a user
    update = (userId: string, updatedUser: Partial<User>): User | null => {
        const index = this.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...updatedUser };
            return this.users[index];
        }
        return null;
    };

    // Function to delete a user
    delete = (userId: string): boolean => {
        const index = this.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    };
}
