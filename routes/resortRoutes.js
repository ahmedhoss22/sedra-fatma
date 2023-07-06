const express = require('express');
const resort = require('../controller/resortController');
const resortFileUpload = require('../middlewares/resortUpload');
const router = express.Router();
const deleteFile=require("../middlewares/deleteFile")

router.route('/resort')
.post(resortFileUpload,resort.postResort)
.get(resort.getResort)

router.delete('/resort/delete/:id',deleteFile.resort,resort.deleteResort)

module.exports = router;