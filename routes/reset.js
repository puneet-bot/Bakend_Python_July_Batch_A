const express           = require('express');
const router            = express.Router();
const userModel         = require('../models/user');

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
    }else{
        res.redirect('/users/signup');
    }
})

module.exports=router;