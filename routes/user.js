const express           = require('express');
const router            = express.Router();
const userModel         = require('../models/user');

router.get('/signin',function(req,res){
    res.render('signin',{
        title:"Google Contacts| Sign In"
    })
})

router.get('/signup',function(req,res){
    res.render('signup',{
        title:"Google Contacts| Sign In"
    })
})

router.post('/create',async function(req,res){
    console.log(req.body);
    try {
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user=await userModel.findOne({email: req.body.email});
        if (!user){
            let createUser= await userModel.create(req.body);
            console.log(createUser);
        }
        return res.redirect('/users/sign-in');
    }
    catch(err){
        console.log('error in finding user in signing up'); return}
})

router.post('/create-session',function(req,res){
    console.log(req.body);
    return res.redirect('back');
})

module.exports=router;