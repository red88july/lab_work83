import mongoose from 'mongoose';
import User from "./User";

const TaskSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => {
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
    }

});

const Task = mongoose.model('Task', TaskSchema);

export default Task;