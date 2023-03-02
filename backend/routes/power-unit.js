const express = require('express');
const router = express.Router();
const powerUnitController = require('../controllers/power-unit.controller');

router.post('/addPowerUnit', powerUnitController.addPowerUnit);
router.get('/getPowerUnits/:id/:role', powerUnitController.getPowerUnits);
router.get('/getPowerUnitById/:id', powerUnitController.getPowerUnitById);
router.post('/updatePowerUnit', powerUnitController.updatePowerUnit);
router.get('/deletePowerUnit/:id', powerUnitController.deletePowerUnit);
router.post('/addPowerUnitLog', powerUnitController.addPowerUnitLog);
router.get('/getPowerUnitLog/:id/:role', powerUnitController.getPowerUnitLog);
router.get('/getPowerUnitLogById/:id', powerUnitController.getPowerUnitLogById);
router.post('/updatePowerUnitLog', powerUnitController.updatePowerUnitLog);
router.get('/deletePowerUnitLog/:id', powerUnitController.deletePowerUnitLog);




module.exports = router;