const express = require('express');
const users = require('../controller/usersController');
const middlware = require('../middlewares/middleware');
const router = express.Router();
const userImgUpload = require('../middlewares/userImgUpload');
const deleteFile = require('../middlewares/deleteFile');

router.post('/signup',users.signup);
router.post('/signin',users.signin);
router.post('/phoneVirefy',middlware.authorization,users.phoneVirefy)
router.get('/sendOtb',middlware.authorization,users.sendOtb)
router.get('/data',middlware.authorization,users.getUser)
router.get('/reservation',middlware.authorization,users.getUserReservations)
router.delete('/reservation/cancel/:id',middlware.authorization,users.cancelUserReservation)
router.patch('/updateDate',middlware.authorization,deleteFile.user,userImgUpload,users.updateUserData)
router.patch('/updatePassword',middlware.authorization,users.updateUserPassword)
module.exports = router;
