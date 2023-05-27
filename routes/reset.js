const express           = require('express');
const router            = express.Router();
const resetController   = require('../controller/resetUser');

router.get('/forgot',resetController.forgotPassword);

router.post('/check',resetController.checkUser);

router.get('/recover',resetController.recoverUser);

router.post('/update',resetController.updateUser);

module.exports=router;