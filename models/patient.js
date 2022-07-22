const mongoose = require("mongoose");

// Patient schema
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      min: [1000000000, 'Phone No must be at least 10, got {VALUE}'],
      max: 9999999999,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export patient schema
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient