const express = require('express');
const router = express.Router();
const financeController=require('../controller/financeController')
const expensesUpload=require('../middlewares/expensesUpload')
const middlwares=require("../middlewares/middleware")

router.route('/expenses')
.post(expensesUpload,financeController.postExpenses)
.get(financeController.getExpenses)
router.delete('/expenses/delete/:id',financeController.deleteExpenses)
router.post('/expenses/update',financeController.updateExpenses)

router.route('/draws')
.post(middlwares.authorization,financeController.postDraws)
.get(financeController.getDraws)
router.delete('/draws/delete/:id',financeController.deleteDraws)
router.post('/draws/update',financeController.updateDraws)

router.route('/paypal')
.post(middlwares.authorization,financeController.postPaypal)
.get(financeController.getPaypal)
router.delete('/paypal/delete/:id',financeController.deletePaypal)
router.post('/paypal/update',financeController.updatePaypal)

router.route('/onlinepayment')
.post(middlwares.authorization,financeController.postOnlinePayment)
.get(financeController.getOnlinePayment)
router.delete('/onlinepayment/delete/:id',financeController.deleteOnlinePayment)
router.post('/onlinepayment/update',financeController.updateOnlinePayment)

router.route('/banktransaction')
.post(middlwares.authorization,financeController.postBankTransaction)
.get(financeController.getBankTransaction)
router.delete('/banktransaction/delete/:id',financeController.deleteBankTransaction)
router.post('/banktransaction/update',financeController.updateBankTransaction)

module.exports = router;