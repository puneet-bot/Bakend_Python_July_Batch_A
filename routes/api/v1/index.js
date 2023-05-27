const express           = require('express');
const router            = express.Router();

router.get('/contacts',require('./contact'));


module.exports=router;