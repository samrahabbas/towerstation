const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/user-management.controller');

router.post('/addPermission', userManagementController.addPermission);
router.get('/getPermissions', userManagementController.getPermissions);
router.post('/updatePermission', userManagementController.updatePermission);
router.get('/deletePermission/:id', userManagementController.deletePermission);
router.get('/getPrivileges', userManagementController.getPrivileges);
router.post('/addUser', userManagementController.addUser);
router.get('/getUsers/:id', userManagementController.getUsers);
router.get('/getUserById/:id', userManagementController.getUserById);
router.post('/updateUser', userManagementController.updateUser);
router.get('/deleteUser/:id', userManagementController.deleteUser);
router.get('/checkRole/:id', userManagementController.checkRole);



module.exports = router;