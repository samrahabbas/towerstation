const express = require('express');
const router = express.Router();
const zipCodeController = require('../controllers/zipCode.controller');

router.get('/zip-code-data/:zipcode', zipCodeController.getZipCode);
router.get('/getStates', zipCodeController.getStates);
router.get('/getStateByCity/:city', zipCodeController.getStateByCity);


module.exports = router;