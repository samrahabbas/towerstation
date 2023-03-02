const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrier.controller');

router.post('/addCarrier', carrierController.addCarrier);
router.get('/getCarriers/:id/:role', carrierController.getCarrier);
router.get('/getCarrierById/:id', carrierController.getCarrierById);
router.post('/updateCarrier', carrierController.updateCarrier);
router.get('/deleteCarrier/:id', carrierController.deleteCarrier);


module.exports = router;