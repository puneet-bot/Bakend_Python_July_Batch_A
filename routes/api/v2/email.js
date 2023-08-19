const express           = require('express');
const router            = express.Router();
const emailController = require('../../../controller/api/v2/email_controller')

router.use('/', emailController.Email);

module.exports = router