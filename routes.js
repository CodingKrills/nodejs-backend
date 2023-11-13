const router = require('express').Router();

// * Dashboard
// router.use('/', require('./routes/report/dasboard'));

// * Caregiver
// router.use('/', require('./routes/caregiver.routes'));

// * Patient
router.use('/patient', require('./routes/patient.routes'));
// router.use('/', require('./routes/approved-patient.routes'));

module.exports = router;
