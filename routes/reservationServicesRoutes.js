const services=require("../controller/reservationServicesController")
const express = require('express');
const router = express.Router();
const middlware = require('../middlewares/middleware');

router.post("/reservation/service",middlware.authorization,services.postService)
router.post("/reservation/service/update",services.updateService)
router.route("/reservation/service/:id")
.get(middlware.authorization,services.getService)
.delete(services.deleteService)

router.get('/reservation/service',middlware.authorization,services.getAllService)


module.exports = router;