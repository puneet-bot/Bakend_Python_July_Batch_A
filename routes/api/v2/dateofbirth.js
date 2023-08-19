const express = require('express');
const router = express.Router();
const DobController = require('../../../controller/api/v2/dob_controller');

router.use('/', DobController.DOB)
module.exports = router