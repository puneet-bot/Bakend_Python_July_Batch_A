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

module.exports=router;