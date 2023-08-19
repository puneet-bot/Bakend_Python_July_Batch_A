const express           = require('express');
const router            = express.Router();
const contact_controller = require('../../../controller/api/v1/contact_controller')

router.use('/', contact_controller.Contact);
// 200-299- Success methods

module.exports=router;