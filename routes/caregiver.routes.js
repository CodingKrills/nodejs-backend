const express = require('express');
const router = express.Router();

const getAllPatient = require('../controllers/patient/get-all-patient.controller');

router.get('/', getAllPatient);

module.exports = router;
