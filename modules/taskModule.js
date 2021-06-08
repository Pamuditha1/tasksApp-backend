const mongoose = require('mongoose');

const Task = mongoose.model('TASK', new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    status: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}));


exports.Task = Task;
