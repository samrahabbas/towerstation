const express = require('express');
const router = express.Router();
const userDocumentController = require('../controllers/user-document.controller');

router.post('/uploadDocument', userDocumentController.uploadDocument);
router.get('/getUserDocument/:id', userDocumentController.getUserDocument);
router.post('/downloadDocument', userDocumentController.downloadDocument);


module.exports = router;