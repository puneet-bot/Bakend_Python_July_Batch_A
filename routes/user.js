const express           = require('express');
const router            = express.Router();
const userModel         = require('../models/user');
const passport          = require('passport');

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
        return res.redirect('/users/signin');
    }
    catch(err){
        console.log('error in finding user in signing up'); return}
})

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
),function(req,res){
    console.log(req.body);
    return res.redirect('/');
})

// router.get('/signout',function(req,res){
//     req.logout(function(err) {
//         if (err) { return next(err); }
//     console.log('success','Signed out Successfully');
//     // req.session.destroy();

//         res.redirect('/');
//       });
// })
// router.get('/signout', function(req, res) {
//     req.session.destroy(function(err) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect('/');
//       }
//     });
//   });
router.get('/signout', function(req, res) {
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
    });
  
    router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
    router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),function(req,res){
        console.log('success','Signed In Successfully');
        res.redirect('/')
    });

module.exports=router;