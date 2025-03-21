const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: Date.now() },
    name: { type: String, required: true },
    completed: {type: Boolean, default: false},
    important: { type: Boolean, default: false },
    lastModifiedDate: { type: Date, default: Date.now }, 
    syncStatus: { type: String, default: "pending", enum: ["pending", "synced", "failed"] }
});

module.exports = mongoose.model('Task', taskSchema);