const express = require("express")
const taskControlletr = require("../Controllers/taskController")

const router = express.Router()

// http://localhost:3000/api/task
router.get('/',taskControlletr.getAllTasks)
// http://localhost:3000/api/task/scheduletask
router.post('/scheduletask',taskControlletr.scheduleTask)
// http://localhost:3000/api/task/id
router.put('/:id',taskControlletr.updateTask)

module.exports = router

