const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assets.controller');

router.post('/addAssetGroup', assetsController.addAssetGroup);
router.get('/getAssets/:id/:role', assetsController.getAssets);
router.get('/getAssetById/:id', assetsController.getAssetById);
router.post('/updateAssets', assetsController.updateAssets);
router.get('/deleteAssets/:id', assetsController.deleteAssets);

module.exports = router;