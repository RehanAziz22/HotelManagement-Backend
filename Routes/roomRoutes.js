const express = require("express")
const roomController = require("../Controllers/roomController")

const router = express.Router()

// http://localhost:3000/api/room/id
router.get('/:id', roomController.getSingleRoom)

// http://localhost:3000/api/room/all
router.get('/', roomController.getAllRooms)

// http://localhost:3000/api/room/signup
router.post('/create', roomController.createRoom)


// http://localhost:3000/api/room/id/status
router.put('/:id/status',roomController.updateRoomStatus)


router.post('/book',roomController.bookRoom)

// http://localhost:3000/api/room/id
// router.delete('/:id', roomController.deleteUser)


module.exports = router

