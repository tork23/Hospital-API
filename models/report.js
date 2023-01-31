const mongoose = require("mongoose");

// Report schema
const reportSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    status: {
      type: String,
      enum:[
        "Negative",
        "Travelled-Quarantine",
        "Symptoms-Quarantine",
        "Positive-Admit"
      ],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export report schema
const Report = mongoose.model('Report', reportSchema);
module.exports = Report