const express           = require('express');
const router            = express.Router();

router.use('/email',require('./email'));
router.use('/name', require('./name'));
router.use('/DOB', require('./dateofbirth'));


module.exports=router;