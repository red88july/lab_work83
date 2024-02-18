import { Model } from "mongoose";

export interface UserTypes {
    username: string;
    password: string;
}

export interface UserTypesExtend extends UserTypes {
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>
    generatedToken(): void;
}

type UserModel = Model<UserTypesExtend, {}, UserMethods>;

export interface TasksDataTypes {
    user: UserTypesExtend;
    title: string;
    description: string;
    status: string;
}

export type TasksDataUpd = Omit<TasksDataTypes, 'user'>