import {Request, Response} from 'express';
import {UserService} from "../services/user.service";
import swaggerJsdoc from "swagger-jsdoc";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const user = await this.userService.getUser(Number(id));
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const requestBody = req.body;
            console.log(requestBody);
            const {name} = req.body;
            console.log(name);
            console.log(req.body);
            if (!req.body) {
                res.status(400).send('Request body is empty');
                return;
            }

            if (!name) {
                res.status(400).send('Name is required');
                return;
            }

            const user = await this.userService.createUser(name);
            res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }


}

