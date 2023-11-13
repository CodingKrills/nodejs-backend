// * Patients ==============
const { createOnePatient } = require('./patient/create-one.patient.controller');
const { getAllPatient } = require('./patient/get-all-patient.controller');
const { getOnePatient } = require('./patient/get-one.patient.controller');
const { updateOnePatient } = require('./patient/update.one.patient.controller');
const { deleteOnePatient } = require('./patient/delete-one.patient.controller');
// * ==========================

module.exports = {
  // * Patients =================
  createOnePatient,
  getAllPatient,
  getOnePatient,
  updateOnePatient,
  deleteOnePatient,
  // * ==========================
};
