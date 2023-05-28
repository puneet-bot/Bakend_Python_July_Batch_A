const contactModel      = require('../models/contact');
const mongoose = require('mongoose');

module.exports.deleteContact=async function(req,res){
    try{
        let deletedContact=await  contactModel.findByIdAndDelete(req.body.contact_id);
        res.redirect('/');
    }
    catch (err) {
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

module.exports.getContactById=async function(req,res){
    try{
    let contact=await contactModel.findById(req.params.id);
    if(contact==null){
        return res.render('error', {
            layout: false,
            title: "Error",
            err:404
        });
    }
    res.render("details",{
        title:"details",
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

module.exports.editContact = async function(req,res){
    
    if(req.xhr){
        const {first_name,last_name,email,phone_number,bday,address_1,address_2,city,state,zip}=req.body;
        updatedObject={
        firstname:first_name,
        lastname:last_name,
        email,
        phoneNumber:phone_number,
        birthdate:bday,
        address1:address_1,
        address2:address_2,
        city,
        state,
        zip
    }   
        try{
        const updatedContact=await contactModel.findByIdAndUpdate(req.body.contact_id,updatedObject,
            { new: true });
        return res.status(200).json({
            data:{
                contact:updatedContact,
            },
            message:"Contact Created!"
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
    // res.redirect('/');
}