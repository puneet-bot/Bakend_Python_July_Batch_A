const contactModel = require('../models/contact');

module.exports.home = async function (req, res) {
    try {
        let contacts = await contactModel.find({});
        console.log(contacts);
        return res.render('home', {
            title: "Home",
            contacts
        });
    } catch (err) {

    }
}