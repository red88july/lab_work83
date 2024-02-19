import mongoose from 'mongoose';
import { randomUUID } from "crypto";

import connectDb from "./connectDb";
import User from './models/User';
import Task from "./models/Task";

const dropCollection = async (db: mongoose.Connection, collectionsName: string) => {
  try {
    await db.dropCollection(collectionsName);
  } catch (e) {
    console.log(`Collection ${collectionsName} was missing, skipping drop...`)
  }
};

const run  = async  () => {
  await mongoose.connect(connectDb.db);
  const db = mongoose.connection;

  const collections = ['users', 'tasks'];

  for (const collectionsName of collections) {
   await dropCollection(db, collectionsName);
  }

  const generatedToken = randomUUID();

  const users = await User.create([
    {
      username: 'Ivanov',
      password: 'Ivanov_123#',
      token: generatedToken,
    },
    {
      username: 'Petrov',
      password: 'Petrov_123#',
      token: generatedToken,
    },
    {
      username: 'Sidorov',
      password: 'Sidorov_123#',
      token: generatedToken,
    },
  ]);

  await Task.create([
    {
      user: users[0]._id,
      title: 'First project on JS',
      description: 'Write first line code',
      status: 'new',
    },
    {
      user: users[1]._id,
      title: 'BUG on Project',
      description: 'First BUG try to solve',
      status: 'in_progress',
    },
    {
      user: users[2]._id,
      title: 'Project is complete',
      description: 'Project is complete and BUG is fixed',
      status: 'complete',
    },
  ]);

  await db.close();
};

void run();