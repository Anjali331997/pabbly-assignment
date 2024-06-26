const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, enum: ['pending', 'completed'], default: false },
    priority: { type: String, enum: ['low', 'medium', 'high'], default:'low' },
    date: { type: Date, required: true },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]
}, { timestamps: true })

const Task = mongoose.model('task', taskSchema);

module.exports = Task;