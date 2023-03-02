const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/roles.controller');

router.post('/addRole', rolesController.addRole);
router.get('/getRoles/:id', rolesController.getRoles);
router.get('/getUserByRole/:id', rolesController.getUserByRole);


module.exports = router;