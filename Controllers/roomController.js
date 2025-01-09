const RoomModel = require("../Models/RoomSchema")

const roomController = {

    getSingleRoom: async (req, res) => {
        const { id } = req.params

        const room = await RoomModel.findById(id)

        if (!room) {
            res.json({
                message: "Room not found",
                status: false
            })
        } else {
            res.json({
                message: "Room found",
                data: room,
                status: true
            })
        }
    },
    getAllRooms:  async (req, res) => {
        const rooms = await RoomModel.find()
        if (rooms.length > 0) {
            res.json({
                message: "rooms found",
                data: rooms,
                status: true
            })
        } else {
            res.json({
                message: "No rooms found",
                status: false
            })
        }
    },
    createRoom: async (req,res)=>{
        const {imageUrl,roomNumber,roomType,availability,pricePerNight,status} = req.body
        if (!imageUrl||!roomNumber||!roomType||!availability||!pricePerNight||!status) {
            res.json({
                message: "Please fill in all fields",
                status: false
            })
        } else {
            // Check if room already exists
            const room = await RoomModel.findOne({ roomNumber })
            if (room) {
                res.json({
                    message: "room already exists with this number",
                    status: false
                })
            } else {
                // Create new room
                const newRoom = new RoomModel({imageUrl,roomNumber,roomType,availability,pricePerNight,status})

                await newRoom.save()
                res.json({
                    message: "Room created successfully",
                    data: newRoom,
                    status: true
                })

            }
        }
       
    },
    updateRoom: async (req, res) => {
        const { roomNumber, imageUrl, roomType, availability, pricePerNight, status } = req.body;
    
        if (!roomNumber) {
            return res.json({
                message: "Room number is required for updating details",
                status: false
            });
        }
    
        try {
            const room = await RoomModel.findOne({ roomNumber });
    
            if (!room) {
                return res.json({
                    message: "Room not found",
                    status: false
                });
            }
    
            // Update room details
            room.imageUrl = imageUrl || room.imageUrl;
            room.roomType = roomType || room.roomType;
            room.availability = availability !== undefined ? availability : room.availability;
            room.pricePerNight = pricePerNight || room.pricePerNight;
            room.status = status || room.status;
    
            await room.save();
    
            res.json({
                message: "Room updated successfully",
                data: room,
                status: true
            });
    
        } catch (error) {
            res.status(500).json({
                message: "Error updating room details",
                error: error.message,
                status: false
            });
        }
    },    
    updateRoomStatus:async (req, res) => {
        const { status } = req.body;
    
        // Ensure status is valid
        const validStatuses = ["cleaning", "occupied", "available", "maintenance"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
    
        try {
            const room = await RoomModel.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );
    
            if (!room) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }
    
            res.status(200).json({ success: true, message: 'Room status updated', data: room });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating room status', error });
        }
    },
    bookRoom: async (req, res) => {
        // const { roomNumber } = req.params;  // Room number from URL
        const { guestId, guestName, guestContact, checkInDate, checkOutDate,totalBill ,roomNumber} = req.body;  // Data from the request body
    
        try {
            // Find the room by room number
            const room = await RoomModel.findOne({ roomNumber });
    
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
    
            if (!room.availability) {
                return res.status(400).json({ message: 'Room is already booked' });
            }
    
            // Update room availability, status, and guest details
            room.availability = false;  // Mark the room as unavailable
            room.status = 'occupied';   // Set room status to occupied
            room.guest = {
                guestId,
                name: guestName,
                contact: guestContact,
                checkInDate: new Date(checkInDate),
                checkOutDate: new Date(checkOutDate),
                totalBill
            };
    
            // Save the updated room document
            await room.save();
    
            // Respond with success
            return res.status(200).json({ message: 'Room successfully booked', room });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    updateCheckInStatus:async (req, res) => {
        const { roomNumber } = req.params;
        const { checkInStatus, guestId, name, contact, checkInDate, checkOutDate,totalBill } = req.body;
    
        try {
            const room = await RoomModel.findOne({ roomNumber });
    
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
    
            // if (room.status !== "available") {
            //     return res.status(400).json({ message: "Room is not available for check-in" });
            // }
    
            // Update guest and check-in details
            room.guest = {
                guestId,
                name,
                contact,
                checkInDate,
                checkOutDate,
                checkInStatus,
                totalBill
                        };
    
            room.status = "occupied"; // Mark room as occupied
            room.availability = false;
    
            await room.save();
            res.status(200).json({ message: "Check-in status updated successfully", room });
        } catch (error) {
            res.status(500).json({ message: "Error updating check-in status", error });
        }
    },
    updateCheckOutStatus:async (req, res) => {
        const { roomNumber } = req.params;
        const { checkOutStatus, guestId, name, contact, checkInDate, checkOutDate,totalBill } = req.body;
    
        try {
            const room = await RoomModel.findOne({ roomNumber });
    
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
    
            room.guest = {
                guestId,
                name,
                contact,
                checkInDate,
                checkOutDate,
                checkOutStatus,
                checkInStatus: true,
                totalBill
                        };
    
            room.status = "available"; // Mark room as occupied
            room.availability = true;
    
            await room.save();
            res.status(200).json({ message: "Check-out status updated successfully", room });
        } catch (error) {
            res.status(500).json({ message: "Error updating check-out status", error });
        }
    }
}

module.exports = roomController;