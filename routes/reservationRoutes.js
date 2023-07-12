const express = require('express');
const reservation = require('../controller/reservationController');
const router = express.Router();
const validReservation=require("../middlewares/validReservation");
const middlware = require('../middlewares/middleware');

router.route('/user/reservation')
.post(middlware.authorization,reservation.postUserUnconfirmedReservation,reservation.postNotification)
router.get('/user/reservations/:id',reservation.getUserReservations)
router.get('/admin/reservations/all',reservation.getAllReservations)

router.route("/admin/reservation")
.post(reservation.postUserUnconfirmedReservation,reservation.postNotification)
.patch(validReservation.checkPeriod,reservation.confirmOrder,reservation.postNotification)

router.route("/admin/reservation/confirmed")
.post(validReservation.confirmedCheckPeriod,middlware.authorization,reservation.postConfirmedReservations,reservation.postNotification)

router.route('/admin/insurance')
.patch(reservation.retriveInsurance)

router.patch("/admin/insurance/finance",reservation.insuranceFinance)
router.post('/admin/reservation/confirmed/deferred',validReservation.checkPeriod,reservation.deferreReservation)
router.post('/admin/reservation/confirmed/update',middlware.authorization,reservation.updateConfirmedReservation)

router.delete('/admin/reservation/delete/:id',reservation.deleteAdminReservation)
router.post('/admin/reservation/update',reservation.updateAdminReservation)

router.patch('/admin/reservation/complete',reservation.completeReservation)
router.post('/user/reservation/rate',reservation.postEntityRate,reservation.rateReservation)
router.get('/user/reservation/rate',reservation.getRates)

router.post("/admin/addReservation",validReservation.checkPeriod,reservation.addReservation)

router.route("/admin/notification")
.get(reservation.getNotification)
.patch(reservation.deleteNotifiaction)

module.exports = router;