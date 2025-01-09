const InvoiceModel = require("../Models/InvoiceSchema");

const invoiceController = {


    generateInvoice: async (req, res) => {
        try {
            const {guestId, name, roomNumber,totalBill, checkInDate,checkOutDate,contact } = req.body;

            // const totalServiceCost = additionalServices.reduce((acc, item) => acc + item.cost, 0);
           

            const newInvoice = new InvoiceModel({
                guestId,
                guestName : name,
                roomNumber,
                // durationOfStay,
                totalBill,
                checkInDate,
                checkOutDate,
                contact
            });

            await newInvoice.save();
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Error generating invoice' });
        }
    },
    getAllInvoices: async (req, res) => {
        const invoices = await InvoiceModel.find();
        res.json(invoices);
    },
    getSingleInvoice:async (req, res) => {
        const invoice = await InvoiceModel.findById(req.params.id);
        res.json(invoice);
    }
}

module.exports = invoiceController;