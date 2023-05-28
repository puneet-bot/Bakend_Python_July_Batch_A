const express           = require('express');
const app               = express();
const router            = express.Router();
const homeController    = require('../controller/index.js');
const createController  = require('../controller/create');
const userController    = require('../controller/profile_controller');

router.get('/',homeController.home);
router.get('/create',createController.create);
router.post('/create/contact',createController.createContact);
router.use('/users',require('./user'));
router.get('/profile', userController.profile);
router.use('/func',require('./func'));
router.use('/reset',require('./reset'));
router.use('/api',require('./api'));

router.use(function(req, res) {
    return res.render('error', {
        layout: false,
        title: "Error",
        err:404
    });
  });


module.exports=router;