const mongoose = require("mongoose");

// Doctor schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    doctor_id: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      min: [1000000000, "Phone No must be at least 10, got {VALUE}"],
      max: 9999999999,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export doctor schema
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
