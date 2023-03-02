const express = require('express');
const router = express.Router();
const shipperController = require('../controllers/shipper.controller');

router.post('/addCustomerShipper', shipperController.addCustomerShipper);
router.get('/getCustomerShipper/:id/:role', shipperController.getCustomerShipper);
router.get('/getCustomerShipperById/:id', shipperController.getCustomerShipperById);


module.exports = router;

