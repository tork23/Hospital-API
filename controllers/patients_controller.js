const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

// Register patient
module.exports.register = async (req, res) => {
  try {
    let patientExist = await Patient.findOne({ phone: req.body.phone });

    // For a new patient
    if (!patientExist) {
      // If patient doesn't exists,create a new patient
      let patient = await Patient.create(req.body);

      return res.status(200).json({
        message: "Patient successfully registered",
        patientId: patient._id,
      });
    } else {
      // If patient already exists
      return res.status(409).json({
        message: "Patient already registered with this phone number",
      });
    }
  } catch (err) {
    console.log(`Error in registering patient: ${err}`);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Create report for the patient
module.exports.createReport = async (req, res) => {
  try {
    // Check if patient exists
    let patient = await Patient.findById(req.params.id);

    // If patient exists
    if (patient) {
      let doctor = await Doctor.findById(req.body.doctor);

      // Create data for report
      let reportData = {
        doctor: req.body.doctor,
        patient: req.params.id,
        status: req.body.status,
        date: req.body.date,
      };

      // Create the report and push in patient's reports
      let report = await Report.create(reportData);
      patient.reports.push(report);

      patient.save();

      return res.status(200).json({
        message: "Patient's report successfully created",
      });
    } else {
      return res.status(409).json({
        message: "Patient registration unsuccessful",
      });
    }
  } catch (err) {
    console.log(`Error in creating report for the patient: ${err}`);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Create all the reports
module.exports.allReports = async (req, res) => {
  try {
    // Find a patient by id in url and populate 
    let patient = await Patient.findById(req.params.id).populate({
      path: "reports",
      populate: { path: "doctor",
      select: "name last_name _id" },
    });

    // If patient exists
    if (patient) {
      return res.status(200).json({
        message: `${patient.name} ${patient.last_name}'s Test Reports`,
        reports: patient.reports,
      });
    // If patient doesn't exists
    } else {
      return res.status(409).json({
        message: "Patient is not registered in database",
      });
    }
  } catch (err) {
    console.log(`Error creating all reports for the patient: ${err}`);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
