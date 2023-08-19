const express           = require('express');
const router            = express.Router();
const userModel         = require('../models/user');
const confirmationModel = require('../models/confirmation');
const crypto            = require('crypto');
const commentsMailer = require('../mailers/recovery_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/recovery-email');

router.get('/forgot',function(req,res){
    res.render('validate_email',{
        title: "Validate Email",
    });
});

router.post('/check',async function(req,res){
    console.log('Here in checking...',req.body);
    let user=await userModel.find({email:req.body.email});
    if(user.length){
         console.log(user);
         let confirm= await confirmationModel.create({
            email: req.body.email,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        });
        console.log(confirm);
            let job = queue.create('reset', confirm).save(function (err) {
                if (err) {
                    console.log('Error in finding in err', err);
                    return;
                }
                console.log('job enqueued', job.id);
                res.redirect('back');
            });
    }else{
        res.redirect('/users/signup');
    }
})

router.get('/recover',async function(req,res){
   let confirm = await confirmationModel.findOne({accessToken:req.query.access_token})
   //todo- add a check here
           // 1. you have to find the confirmation schema from the access token  {....}
        // 2. 
        
        console.log('here is confirm',confirm)
        if(confirm.isValid==false){
            return res.redirect('/reset/error')
        }
    
    res.render('reset',{title:"reset",token:req.query.access_token, isValid:true});
});

router.post('/update',async function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        res.redirect('/reset');
    }
    let token=await confirmationModel.findOne({accessToken:req.body.token})
        token.isValid=false;
        token.save();
       let user= await  userModel.findOne({email:token.email});
            user.password=req.body.password;
            user.save();
            res.redirect('/users/signin');
    
});

router.get('/error', async function(req,res){
    return res.render('Error', {
        title: '404 Error',
        message: "Token is expired",
        image: "/images/oops-404-error-with-broken-robot-concept-illustration_114360-5529.avif"
    })
})

module.exports=router;