const express = require('express');
const router = express.Router();
const customer=require('../controller/customerController')

router.route('/customer')
.post(customer.postCustomer)
.get(customer.getCustomer)
router.delete('/customer/delete/:id',customer.deleteCustomer)
router.post('/customer/update',customer.updateCustomer)

module.exports = router;