const contactModel      = require('../models/contact')

module.exports.profile = async function(req, res){
    try{
        const contact = await contactModel.findOne({});
        console.log(contact)
        
        return res.render('user_profile', {
            title: 'User Profile',
            contact
            
        })

    }catch(err){
        console.log(err)
    }
}