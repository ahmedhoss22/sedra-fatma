const express = require('express');
const router = express.Router();
const cors = require("cors")
const employee=require("../controller/employeeController");
const middlware = require('../middlewares/middleware');
router.use(cors({origin:true}))
router.post('/signin',employee.signin)
router.route('/data')
.post(middlware.authorization,employee.addEmployee)
.get(middlware.authorization,employee.getEmployees)
router.delete('/data/:id',employee.deleteEmployee)
router.post('/data/update',employee.updateEmployee)
router.post('/permissions/update',employee.updatePermissions)
router.get('/user/data',middlware.authorization,employee.getAdminData)
module.exports = router;