const userModel         = require('../models/user');
const confirmationModel = require('../models/confirmation');   
const crypto            = require('crypto');
const commentsMailer = require('../mailers/recovery_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/recovery-email');

module.exports.checkUser=async function(req,res){
    try{
    let user=await userModel.find({email:req.body.email});
    if(user.length){
         let confirm= await confirmationModel.create({
            email: req.body.email,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true
        });
            let job = queue.create('reset', confirm).save(function (err) {
                if (err) {
                    return;
                }
                res.redirect('back');
            });
    }else{
        res.redirect('/users/signup');
    }
}catch (err) {
    if (err instanceof mongoose.CastError) {
        // 400 Error: Invalid ID format
        return res.render('error',{ 
            layout: false,
            title: "Error",
            err:400
        });
      }
      // 500 Error: Internal Server Error
      return res.render('error', {
        layout: false,
        title: "Error",
        err:500
    });
    
  }
}

module.exports.forgotPassword = async function(req,res){
        res.render('validate_email',{
            title: "Validate Email"
        });
}

module.exports.recoverUser= async function(req,res){
    try{
    await confirmationModel.findOne({accessToken:req.query.access_token})
    //todo- add a check here
            // 1. you have to find the confirmation schema from the access token  {....}
         // 2. 
     res.render('reset',{title:"reset",token:req.query.access_token});
    }catch (err) {
        if (err instanceof mongoose.CastError) {
            // 400 Error: Invalid ID format
            return res.render('error',{ 
                layout: false,
                title: "Error",
                err:400
            });
          }
          // 500 Error: Internal Server Error
          return res.render('error', {
            layout: false,
            title: "Error",
            err:500
        }); 
      }
 }

 module.exports.updateUser= async function(req,res){
    try{
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
}catch (err) {
    if (err instanceof mongoose.CastError) {
        // 400 Error: Invalid ID format
        return res.render('error',{ 
            layout: false,
            title: "Error",
            err:400
        });
      }
      // 500 Error: Internal Server Error
      return res.render('error', {
        layout: false,
        title: "Error",
        err:500
    });
    
  }
}