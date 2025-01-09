const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    imageUrl: {
        type: String,
        default:"https://tse1.mm.bing.net/th?id=OIP.a1j6IvsqB2aCxvF_yYNw0AHaE8&pid=Api&P=0&h=220"
    },
    roomNumber: {
        type: String, // Unique identifier for the room
        required: true,
        unique: true
    },
    roomType: {
        type: String, // e.g., "Single", "Double", "Suite"
        required: true
    },
    availability: {
        type: Boolean, // If the room is available (true) or not (false)
        default: true
    },
    pricePerNight: {
        type: Number, // The price of the room per night
        required: true
    },
    status: {
        type: String, // e.g., "cleaning", "occupied", "available", "maintenance"
        enum: ["cleaning", "occupied", "available", "maintenance"],
        default: "available"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    guest: {
        guestId:{
            type: String,  // Unique identifier for the guest
            required: false
        },
        name: {
            type: String,  // Name of the guest
            required: false
        },
        contact: {
            type: String,  // Contact information of the guest (e.g., phone number)
            required: false
        },

        checkInDate: {
            type: Date,  // Date when the guest checks in
            required: false
        },
        checkOutDate: {
            type: Date,  // Date when the guest checks out
            required: false
        },
        checkInStatus:{
            type:Boolean,
            default:false
        },
        checkOutStatus:{
            type:Boolean,
            default:false
        },
        totalBill:{
            type: Number,
            default: 0
        }
    }
});


const RoomModel = mongoose.model('Room', roomSchema);
module.exports = RoomModel



