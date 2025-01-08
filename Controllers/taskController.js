const TaskModel = require('../Models/TaskSchema')

const taskControlletr = {
    scheduleTask: async (req, res) => {
        const { roomNumber, taskType } = req.body;
        try {
            const newTask = new TaskModel({ roomNumber, taskType });
            await newTask.save();
            res.status(201).json({ message: 'Task scheduled successfully', data: newTask });
        } catch (error) {
            res.status(500).json({ message: 'Error scheduling task', error });
        }
    },

    getAllTasks: async (req, res) => {
        try {
            const tasks = await TaskModel.find();
            res.status(200).json({ message: 'Tasks retrieved successfully', data: tasks });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks', error });
        }
    },
    
    updateTask: async (req, res) => {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                req.params.id,
                { status: 'completed' },
                { new: true }
            );
    
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
    
            res.status(200).json({ message: "Task marked as completed", data: task });
        } catch (error) {
            res.status(500).json({ message: "Error updating task", error });
        }
    }
}

module.exports = taskControlletr;