const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');
// to the user side
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getAccounts',ctrlUser.getAccounts);


//to the admin side
//  router.post('/adminreg',  ctrlAdmin.adminreg);
// router.post('/adminlogin',  ctrlAdmin.adminlogin);
// router.get('/adminProfile',jwtHelper.verifyJwtToken1, ctrlAdmin.adminProfile);

module.exports = router;
