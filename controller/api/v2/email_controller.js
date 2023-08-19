const contactModel      = require('../../../models/contact');

module.exports.Email = async function(req,res){
    const emails = await contactModel.find({}, 'email');
    console.log(emails)
    const slicedEmail = emails.slice(0,5);
    res.json(200,{
        message: "list of top 5 email",
        slicedEmail
    })
}