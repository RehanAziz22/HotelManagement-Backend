const { Schema, default: mongoose } = require("mongoose");

const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
 
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
})

const feedbackModel = mongoose.model("feedback",feedbackSchema)
module.exports = feedbackModel