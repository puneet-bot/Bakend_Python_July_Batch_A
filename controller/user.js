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
    try {
        if(req.body==null){
            return res.render('error',{
                layout: false,
                title: "error",
                err:400
            })
        }
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user=await userModel.findOne({email: req.body.email});
        if (!user){
            let createUser= await userModel.create(req.body);
        }
        return res.redirect('/users/signin');
    }
    catch (err) {
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

module.exports.signOut = async function(req,res){

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
    return res.redirect('/');
}

module.exports.googleCallBack= async function(req,res){
    res.redirect('/')
}