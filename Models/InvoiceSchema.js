const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    guestName: String,
    roomNumber: String,
    roomRate: Number,
    checkInDate: Date,
    checkOutDate: Date,
    totalBill: Number,
    contact: String,
    generatedDate: { type: Date, default: Date.now }
});

const InvoiceModel = mongoose.model('invoice', InvoiceSchema);
module.exports = InvoiceModel
