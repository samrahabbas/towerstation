const express = require('express');
const router = express.Router();
const SignedDocumentController = require('../controllers/signedDocuments.controller');

router.post('/addDocument', SignedDocumentController.addDocument);
router.post('/savePdf', SignedDocumentController.savePdf);
router.get('/getDocuments/:id/:role', SignedDocumentController.getDocuments);
router.get('/getSignedDocuments/:id/:role', SignedDocumentController.getSignedDocuments);
router.get('/deleteDocument/:id', SignedDocumentController.deleteDocument);
router.get('/getSignedDocumentsById/:id', SignedDocumentController.getSignedDocumentsById);


module.exports = router;