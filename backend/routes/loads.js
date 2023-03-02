const express = require('express');
const router = express.Router();
const loadsController = require('../controllers/loads.controller');

router.post('/add', loadsController.addLoads);
router.get('/getLoads/:id', loadsController.getLoads);
router.post('/search', loadsController.search);
router.post('/addPickupDate', loadsController.addPickupDate);
router.post('/addLoadsDocument', loadsController.addLoadsDocument);
router.get('/getAllLoads/:id', loadsController.getAllLoads);
router.post('/uploadDocument', loadsController.uploadDocument);
router.get('/getLoadDocument/:userId/:loadId', loadsController.getLoadDocument);
router.post('/downloadDocument', loadsController.downloadDocument);




module.exports = router;


