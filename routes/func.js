const express           = require('express');
const router            = express.Router();
const contactModel      = require('../models/contact');


router.post('/edit',async function(req,res){
    
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
        let updatedContact=await contactModel.findByIdAndUpdate(req.body.contact_id,updatedObject,
            { new: true });
        console.log("contact-detail",updatedContact);
        return res.status(200).json({
            data:{
                contact:updatedContact,
            },
            message:"Contact Created!"
        })
    }


    // res.redirect('/');
})

router.post('/delete',async function(req,res){
    console.log('here in delete',req.body);
    try{
        let deletedContact=await  contactModel.findByIdAndDelete(req.body.contact_id);
        console.log(deletedContact);
        res.redirect('/');
    }
    catch(err){
        console.log(err);
    }
});

router.get('/details/:id',async function(req,res){
    let contact=await contactModel.findById(req.params.id);
    console.log(contact);
    res.render("details",{
        title:"details",
        contact
    })
})

module.exports=router;