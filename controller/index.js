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