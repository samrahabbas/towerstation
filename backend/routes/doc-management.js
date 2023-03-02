const express = require('express');
const router = express.Router();
const docManagementController = require('../controllers/doc-management.controller');

router.post('/uploadDocument', docManagementController.uploadDocument);
router.get('/getDocuments/:id/:role', docManagementController.getDocuments);
router.post('/downloadDocument', docManagementController.downloadDocument);
router.get('/deleteDocument/:id', docManagementController.deleteDocument);


module.exports = router;