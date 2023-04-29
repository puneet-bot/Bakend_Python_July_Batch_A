const express           = require('express');
const router            = express.Router();
const contactModel      = require('../models/contact');


router.post('/edit',async function(req,res){
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
    let updatedContact=await contactModel.findByIdAndUpdate(req.body.contact_id,updatedObject);
    res.redirect('/');
})

module.exports=router;