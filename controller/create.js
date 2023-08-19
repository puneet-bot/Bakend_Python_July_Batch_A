const contactModel      = require('../models/contact');

module.exports.create=(request,response)=>{
    return response.render('create',{
        title:"Google | Create Contact"
    })
}

module.exports.createContact=async (req,res)=>{
    try{
    contactModel.uploadedAvatar(req,res,async function(err){
        
    let contact = await  contactModel.create({
        firstname:req.body.first_name,
        lastname:req.body.last_name,
        phoneNumber:req.body.phone_number,
        email:req.body.email,
        birthdate:req.body.bday,
        address1:req.body.address_1,
        address2:req.body.address_2,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip,
        image:(req.file)?contactModel.avatarPath+'/'+req.file.filename:req.body.image_link,
    });
    contact.save();
    })
    return res.redirect('/');
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