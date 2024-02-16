import bcrypt from 'bcrypt';
import {Schema, model} from "mongoose";
import {randomUUID} from "crypto";

import {UserMethods, UserModel, UserTypesExtend} from "../types";

const SALT = 11;

const UserSchema = new Schema<UserTypesExtend, UserModel, UserMethods>({

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: true,
    },

}, {versionKey: false});

UserSchema.methods.generatedToken = function () {
    this.token = randomUUID();
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
})

const User = model<UserTypesExtend, UserModel>('User', UserSchema);

export default User;