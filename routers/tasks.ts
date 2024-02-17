import mongoose from "mongoose";
import { Router } from 'express';

import auth, { RequestUser } from "../middleware/auth";
import Task from "../models/Task";

export const tasksRouter = Router();

tasksRouter.post('/', auth, async (req:RequestUser, res, next) => {

    try {

        const taskData = {
            user: req.user,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        }
        const tasksUser = new Task(taskData);

        await tasksUser.save();
        res.send(tasksUser);

    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.send(422).send(e);
        }
        next(e);
    }
});

tasksRouter.get('/', auth, async (req:RequestUser, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).send({ error: 'Unauthorized user' });
        }

        const tasks = await Task.find({ user: req.user._id });

        res.send(tasks);

    } catch (e) {
        next(e);
    }
});

tasksRouter.put('/:id', async (req,  res, next) => {
    try {

    } catch (e) {
        next(e);
    }
});

tasksRouter.delete('/:id', async (req, res, next) => {
    try {

    } catch (e) {
        next(e);
    }
});