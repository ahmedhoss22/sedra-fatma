const express = require('express');
const hall = require('../controller/hallController');
const hallFileUpload = require('../middlewares/hallUpload');
const router = express.Router();
const deleteFile=require("../middlewares/deleteFile")

router.route('/hall')
.post(hallFileUpload,hall.postHall)
.get(hall.getHall)
router.delete('/hall/delete/:id',deleteFile.hall,hall.deleteHall)
module.exports = router;