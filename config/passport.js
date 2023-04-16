const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        // passReqToCallback:true
    },
    async function(req,email, password, done){
        // find a user and establish the identity
        try{
        let U=await User.findOne({email: email});
        //  function(err, U)  {
            

            if (!U || U.password != password){
                console.log('error',"Invalid Username/Password");
                return done(null, false);
            }

            return done(null, U);
        }
        catch(err){
            if (err){
                console.log('error',err);
            }
        }
        // });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);

});



// deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try{
    let k=User.findById(id);
    //  async function(err, user){
        

        return done(null, k);
    // });}
    }
    catch(err){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
    }
    
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;