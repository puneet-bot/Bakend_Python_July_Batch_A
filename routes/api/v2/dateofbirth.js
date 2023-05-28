const express = require('express');
const router = express.Router();
const contactModel = require('../../../models/contact');

router.use('/', async function(req, res){
    const DOB = await contactModel.find({}, 'birthdate');

    return res.json(200,{
        message: 'list of DOB',
        DOB
    })
})

module.exports = router