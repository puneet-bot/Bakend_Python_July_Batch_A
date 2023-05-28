const express           = require('express');
const router            = express.Router();
const passport          = require('passport');

router.get('/contacts',passport.authenticate('jwt',{session:false}),require('./contact'));
router.use('/token',require('./token'))


module.exports=router;