const express           = require('express');
const router            = express.Router();
const userModel         = require('../models/user');
const passport          = require('passport');
const userController    = require('../controller/user');

router.get('/signin',userController.signInUser);
router.get('/signup',userController.signUp);
router.get('/signout', userController.signOut);
router.post('/create', userController.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),userController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.googleCallBack);

module.exports=router;