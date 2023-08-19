const contactModel      = require('../models/contact')

module.exports.profile = async function(req, res){
    try{
        const contact = await contactModel.findOne({});        
        return res.render('user_profile', {
            title: 'User Profile',
            contact
        })

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