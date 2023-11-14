import express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import * as fs from 'fs';
import * as YAML from 'yaml';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { authenticationMiddleware } from './middlewares/auth.middleware';

const app = express();
const port = process.env.PORT || 3000;

const swaggerFilePath = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = YAML.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

app.use(authenticationMiddleware(userService));

// Define routes
app.use('/api/users', userController.router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
