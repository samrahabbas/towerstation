const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.post('/addLocation', locationController.addLocation);
router.get('/getLocations/:id/:role', locationController.getLocation);
router.get('/getLocationById/:id', locationController.getLocationById);
router.post('/updateLocation', locationController.updateLocation);
router.get('/deleteLocation/:id', locationController.deleteLocation);


module.exports = router;