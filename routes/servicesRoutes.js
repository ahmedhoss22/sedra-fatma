const services=require("../controller/servicesController")
const express = require('express');
const router = express.Router();
const middlware = require('../middlewares/middleware');

router.route("/package")
.get(middlware.authorization,services.getPackages)
.post(services.postPackage)

router.post("/package/update",services.updatePackage)

router.delete("/package/:id",services.deletePackage)

router.route("/services")
.get(middlware.authorization,services.getServices)
.post(services.postService)
.patch(services.updateService)
router.delete("/services/:id",services.deleteService)
router.post("/services/update",services.updateService)
module.exports = router;