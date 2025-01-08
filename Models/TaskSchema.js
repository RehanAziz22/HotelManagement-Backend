const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema; 
const TaskSchema = new Schema({
    roomNumber: {
        type: String,
        required: true
    },
    taskType: {
        type: String, // e.g., "Cleaning", "Maintenance"
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    scheduledAt: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 86400, partialFilterExpression: { status: "completed" } });


const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;