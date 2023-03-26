const express           = require('express');
const app               = express();
const router            = express.Router();
const homeController    = require('../controller/index.js');
const createController  = require('../controller/create');

console.log('here in the router');
router.get('/',homeController.home);

router.get('/create',createController.create);

router.get('/google',function(req,res)
{
    return res.render('google',{title:"google page"});
}

);
module.exports=router;

