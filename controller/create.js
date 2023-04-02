const contactModel      = require('../models/contact');

module.exports.create=(request,response)=>{
    return response.render('create',{
        title:"Google | Create Contact"
    })
}

module.exports.createContact=async (req,res)=>{
    console.log(req.body);
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
        zip:req.body.zip
    });
    contact.save();
    console.log(contact);
    return res.redirect('back');
}