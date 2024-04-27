const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, enum: ['pending', 'completed'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    date: { type: Date, required: true },
    email: {type:Array},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Task = mongoose.model('task', taskSchema);

module.exports = Task;