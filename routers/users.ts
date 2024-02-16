import { Router } from 'express';
import mongoose from "mongoose";
import User from "../models/User";
import user from "../models/User";
import {UserTypes} from "../types";

export const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
    try {

        const userData: UserTypes = {
            username: req.body.username,
            password: req.body.password,
        }

        const newUser = new User(userData);
        newUser.generatedToken();
        await newUser.save();

        res.send(newUser);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }
        next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {

});