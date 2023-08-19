const contactModel = require('../../../models/contact');

module.exports.DOB = async function(req, res){
    const DOB = await contactModel.find({}, 'birthdate');

    return res.json(200,{
        message: 'list of DOB',
        DOB
    })
}
