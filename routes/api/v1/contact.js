const express           = require('express');
const router            = express.Router();
const contactModel      = require('../../../models/contact');

router.use('/',async function(req,res){
    let contacts=await contactModel.find({})
        .sort('-createdAt')
    return res.json(200,{
        message:"list of Contacts",
        contacts
    })
});
// 200-299- Success methods

module.exports=router;