const express           = require('express');
const router            = express.Router();
const contactModel      = require('../models/contact');


router.post('/edit',async function(req,res){
    // const {first_name,last_name,email,phone_number,bday,address_1,address_2,city,state,zip}=req.body;4
    console.log('edit----',req.body);
    if(req.xhr){
        let contact_detail = await contactModel.findById(req.body.contact_id)
        // console.log("post-detail",post_detail);
        return res.status(200).json({
            data:{
                contact:contact_detail,
            },
            message:"Contact Created!"
        })
    }

    // updatedObject={
    //     firstname:first_name,
    //     lastname:last_name,
    //     email,
    //     phoneNumber:phone_number,
    //     birthdate:bday,
    //     address1:address_1,
    //     address2:address_2,
    //     city,
    //     state,
    //     zip
    // }
    // let updatedContact=await contactModel.findByIdAndUpdate(req.body.contact_id,updatedObject);
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
})

module.exports=router;