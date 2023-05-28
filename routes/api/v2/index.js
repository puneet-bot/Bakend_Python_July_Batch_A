const express           = require('express');
const router            = express.Router();

router.get('/email',require('./email'));
router.get('/name', require('./name'));
router.get('/DOB', require('./dateofbirth'));


module.exports=router;