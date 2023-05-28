const express           = require('express');
const app               = express();
const router            = express.Router();
const homeController    = require('../controller/index.js');
const createController  = require('../controller/create');
const userController    = require('../controller/profile_controller');

console.log('here in the router');
router.get('/',homeController.home);

router.get('/create',createController.create);
router.post('/create/contact',createController.createContact);
router.use('/users',require('./user'));
router.get('/profile', userController.profile);
router.use('/func',require('./func'));
router.use('/reset',require('./reset'));
router.use('/api',require('./api'));

// http://localhost:8000/api/v1/contacts
module.exports=router;