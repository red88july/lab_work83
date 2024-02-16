import {Model} from "mongoose";
import User from "./models/User";

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

export interface UserTypesSession {
    user: User;
}