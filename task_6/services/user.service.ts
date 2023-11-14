import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

import fs from 'fs';
// Example file system storage for users
const usersFilePath = 'users.json';

function saveUsersToFile(users: User[]) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
}

function loadUsersFromFile(): User[] {
    try {
        const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error: any) {
        // Handle file reading error or return an empty array
        console.error('Error reading users file:', error.message);
        return [];
    }
}

export class UserService {
    private users: User[] = []; // Assuming User is a model with id, name, email, etc.
    private usersFromFile: User[] = loadUsersFromFile();
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    // Function to create a new user
    createUser = (user: Omit<User, 'id'>): User => {
        return this.userRepository.create(user);
    };

    // Function to update user properties
    updateUser = (userId: string, updatedUser: Partial<User>): User | null => {
        return this.userRepository.update(userId, updatedUser);
    };

    // Function to get a user by ID
    getUserById = (userId: string): User | null => {
        return this.userRepository.getById(userId);
    };

    // Function to check if a user with the given ID exists
    isUserExists = (userId: string): boolean => {
        return this.users.some((user) => user.id === userId);
    };

    // Function to delete a user
    deleteUser = (userId: string): boolean => {
        return this.userRepository.delete(userId);
    };
}
