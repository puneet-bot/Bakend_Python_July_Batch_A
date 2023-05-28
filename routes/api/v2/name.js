const express = require('express');
const router = express.Router();
const contactModel = require('../../../models/contact');

router.use('/', async function(req, res){
    const name = await contactModel.find({},'firstname lastname');
    res.json(200,{
        message: "list of name",
        name
    })
})

module.exports = router