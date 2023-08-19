const contactModel      = require('../../../models/contact');

module.exports.Contact = async function(req,res){
    let contacts=await contactModel.find({})
        .sort('-createdAt')
    return res.json(200,{
        message:"list of Contacts",
        contacts
    })
};