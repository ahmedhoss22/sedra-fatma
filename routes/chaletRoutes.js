const express = require('express');
const chalet = require('../controller/chaletController');
const chaletFileUpload = require('../middlewares/chaletUpload');
const router = express.Router();
const deleteFile=require("../middlewares/deleteFile")

router.route('/chalet')
.post(chaletFileUpload,chalet.postChalet)
.get(chalet.getChalet)
router.delete('/chalet/delete/:id',deleteFile.chalet,chalet.deleteChalet)
module.exports = router;