import mongoose, {Types} from "mongoose";
import { Router } from 'express';

import auth, { RequestUser } from "../middleware/auth";
import Task from "../models/Task";
import { TasksDataTypes, TasksDataUpd } from "../types";

export const tasksRouter = Router();

tasksRouter.post('/', auth, async (req:RequestUser, res, next) => {

    try {

        if (!req.user) {
            return res.status(401).send({error: 'Unauthorized user'});
        }

        const taskData: TasksDataTypes = {
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

        let authByUser = req.user?._id;

        const tasks = await Task.find({ user: authByUser });

        res.send(tasks);

    } catch (e) {
        next(e);
    }

});

tasksRouter.put('/:id', auth, async (req: RequestUser, res, next) => {
    try {

        let authByUser = req.user?._id.toString()

        let _id: Types.ObjectId;

        try {
            _id = new Types.ObjectId(req.params.id);
        } catch (e) {
            return res.status(404).send({ error: 'Wrong ObjectId' });
        }

        const task = await Task.findById(_id);

        if (!task) {
            return res.status(404).send({ error: 'Task not found!' });
        }

        let taskOfUser = task.user.toString();

        if (taskOfUser !== authByUser) {
            return res.status(403).send({ error: 'You cannot edit this task!' });
        }

        const update: TasksDataUpd = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        }

        const updatedTask = await Task.findByIdAndUpdate(_id, update,{ new: true });

        return res.send({message: 'Task was updated!', updatedTask});
    } catch (e) {
        next(e);
    }
});


tasksRouter.delete('/:id', auth, async (req: RequestUser, res, next) => {
    try {

        let authByUser = req.user?._id.toString()

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).send({ error: 'Task not found!' });
        }

        let taskOfUser = task.user.toString();

        if (taskOfUser !== authByUser) {
            return res.status(403).send({ error: 'You cannot delete this task.' });
        }

        const deleteTask = await Task.findByIdAndDelete(req.params.id);

        res.send({ message: 'Task deleted successfully.', deleteTask });

    } catch (e) {
        next(e);
    }
});