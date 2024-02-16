import express from 'express';
import mongoose from "mongoose";

import connectDb from "./connectDb";
import { usersRouter } from "./routers/users";
import { tasksRouter } from "./routers/tasks";

const app = express();
const port = 8000;

app.use(express.json());

app.use ('/users', usersRouter);
app.use('/tasks', tasksRouter);

const run = async () => {

    await mongoose.connect(connectDb.db);

    app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
    });

};

void run ();