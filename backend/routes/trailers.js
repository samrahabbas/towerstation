const express = require('express');
const router = express.Router();
const trailersController = require('../controllers/trailers.controller');

router.post('/addTrailers', trailersController.addTrailers);
router.get('/getTrailers/:id/:role', trailersController.getTrailers);
router.get('/getTrailerById/:id', trailersController.getTrailerById);
router.post('/updateTrailer', trailersController.updateTrailer);
router.get('/deleteTrailer/:id', trailersController.deleteTrailer);
router.post('/addTrailerLog', trailersController.addTrailerLog);
router.get('/getTrailersLog/:id/:role', trailersController.getTrailersLog);
router.get('/getTrailerLogById/:id', trailersController.getTrailerLogById);
router.post('/updateTrailerLog', trailersController.updateTrailerLog);
router.get('/deleteTrailerLog/:id', trailersController.deleteTrailerLog);





module.exports = router;