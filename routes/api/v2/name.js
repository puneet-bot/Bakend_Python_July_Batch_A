const express = require('express');
const router = express.Router();
const nameController = require('../../../controller/api/v2/name_controller');

router.use('/', nameController.Name);

module.exports = router