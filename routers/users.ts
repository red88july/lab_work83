import {Router} from 'express';
import mongoose from "mongoose";
import User from "../models/User";
import { UserTypes } from "../types";


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

usersRouter.post('/sessions',  async (req, res, next) => {

    try {

        const username = await User.findOne({username: req.body.username});

        if (!username) {
            return res.status(422).send({message: `Username not found`});
        }

        const checkPass = await username.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Password not found`});
        }

        username.generatedToken();
        await username.save();

        res.send(username);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.send(422).send(e);
        }
        next(e);
    }

});