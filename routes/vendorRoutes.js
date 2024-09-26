
const express = require('express');
const { vendorRegister, vendorLogin, getAllVendors, getVendorById } = require('../controllers/vendorController');


const router = express.Router();

router.post('/register',vendorRegister);
router.post('/login',vendorLogin);
router.get('/get-all',getAllVendors);
router.get('/get/:id',getVendorById);

module.exports = router 