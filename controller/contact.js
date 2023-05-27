const contactModel      = require('../models/contact');

module.exports.deleteContact=async function(req,res){
    console.log('here in delete',req.body);
    try{
        let deletedContact=await  contactModel.findByIdAndDelete(req.body.contact_id);
        console.log(deletedContact);
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error"
          });
    }
}

module.exports.deleteContactById=async function(req,res){
    try{
    let contact=await contactModel.findById(req.params.id);
    console.log(contact);
    res.render("details",{
        title:"details",
        contact
    })
}catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error"
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
        console.log(err);
        return res.status(500).json({
          error: "Internal Server Error"
        });
    }
}
    // res.redirect('/');
}