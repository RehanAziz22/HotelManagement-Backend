const express = require("express")
const invoiceController = require("../Controllers/invoiceController");

const router = express.Router()


router.post('/generate', invoiceController.generateInvoice)

router.get('/',invoiceController.getAllInvoices );

// Get a specific invoice
router.get('/invoice/:id', invoiceController.getSingleInvoice);


module.exports = router;