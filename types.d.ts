import {Model} from "mongoose";

export interface UserTypes {
    username: string;
    password: string;
}

export interface UserTypesExtend extends UserTypes {
    token: string;
}

interface UserMethods {
    generatedToken(): void;
}

type UserModel = Model<UserTypesExtend, unknown, UserMethods>;