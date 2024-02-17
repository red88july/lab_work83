import { Schema, Types, model } from 'mongoose';
import User from "./User";

const TaskSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return Boolean(user);
            },
            message: `User doesn't find!`,
        },
    },

    title: {
        type: String,
        required: true,
    },

    description: String,

    status: {
        type: String,
        enum: ['new', 'in_progress', 'complete'],
        default: 'new',
    },
});


const Task = model('Task', TaskSchema);

export default Task;