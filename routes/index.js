const express           = require('express');
const app               = express();
const router            = express.Router();
const homeController    = require('../controller/index.js');
const createController  = require('../controller/create');

console.log('here in the router');
router.get('/',homeController.home);

router.get('/create',createController.create);
router.post('/create/contact',createController.createContact);


module.exports=router;