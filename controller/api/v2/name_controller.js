const contactModel = require('../../../models/contact');

module.exports.Name = async function(req, res){
    const name = await contactModel.find({},'firstname lastname');
    res.json(200,{
        message: "list of name",
        name
    })
}