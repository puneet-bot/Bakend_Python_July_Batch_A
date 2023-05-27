const { session } = require("passport")
const userModel         = require('../models/user');

module.exports.signInUser = async function (req, res) {
    res.render('signin',{
        title:"Google Contacts| Sign In"
    })
}

module.exports.signUp = async function(req,res){
    res.render('signup',{
        title:"Google Contacts| Sign In"
    })
}



module.exports.createUser = async function(req,res){
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
        return res.redirect('/users/signin');
    }
    catch(err){
        console.log('error in finding user in signing up'); 
        return;
    }
}

module.exports.signOut = async function(req,res){
    console.log('logging out');
                req.logout(function(err) {
                    if (err) {
                        return next(err);
                    }
                    req.session.destroy(function(err) {
                        if (err) {
                            return next(err);
                        }
                        res.clearCookie('Google_Contacts'); // use the name of the session cookie here
                        res.redirect('/');
                    });
                });
}

module.exports.createSession    =   async function(req,res){
    console.log(req.body);
    return res.redirect('/');
}

module.exports.googleCallBack= async function(req,res){
    console.log('success','Signed In Successfully');
    res.redirect('/')
}