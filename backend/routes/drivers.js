const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');

router.post('/addDriver', driverController.addDriver);
router.get('/getDrivers/:id/:role', driverController.getDrivers);
router.get('/getDriverById/:id', driverController.getDriverById);
router.post('/updateDriver', driverController.updateDriver);
router.get('/deleteDriver/:id', driverController.deleteDriver);

router.post('/addPayItems', driverController.addPayItems);
router.get('/getDriverPayItems/:id/:role', driverController.getDriverPayItems);
router.get('/getPayItemById/:id', driverController.getPayItemById);
router.post('/updatePayItem', driverController.updatePayItem);
router.get('/deletePayItem/:id', driverController.deletePayItem);


router.post('/addViolation', driverController.addViolation);
router.get('/getViolations/:id/:role', driverController.getViolations);
router.get('/getViolationById/:id', driverController.getViolationById);
router.post('/updateViolation', driverController.updateViolation);
router.get('/deleteViolation/:id', driverController.deleteViolation);


router.post('/addDeduction', driverController.addDeduction);
router.get('/getDriverDeductions/:id/:role', driverController.getDriverDeductions);
router.get('/getDeductionById/:id', driverController.getDeductionById);
router.post('/updateDeduction', driverController.updateDeduction);
router.get('/deleteDeduction/:id', driverController.deleteDeduction);





module.exports = router;