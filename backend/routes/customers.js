const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers.controller');

router.post('/addCustomer', customersController.addCustomer);
router.get('/getCustomers/:id/:role', customersController.getCustomer);
router.get('/getCustomerById/:id', customersController.getCustomerById);
router.post('/updateCustomer', customersController.updateCustomer);
router.get('/deleteCustomer/:id', customersController.deleteCustomer);


module.exports = router;