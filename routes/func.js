const express           = require('express');
const router            = express.Router();
const contactController = require('../controller/contact');

router.post('/edit',contactController.editContact);

router.post('/delete',contactController.deleteContact);

router.get('/details/:id',contactController.getContactById);

module.exports=router;