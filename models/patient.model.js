const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    patient_profile_image: {
      type: String,
    },

    patient_first_name: {
      type: String,
      default: null,
    },

    patient_middle_name: {
      type: String,
      default: null,
    },

    patient_last_name: {
      type: String,
      default: null,
    },

    patient_service_type: {
      type: String,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('patient', patientSchema);
