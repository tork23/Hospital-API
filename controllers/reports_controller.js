const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.status = async (req, res) => {
  try {
    // Populate report with patient and doctor
    let report = await Report.find({ status: req.params.status })
      .populate({
        path: "patient",
        select: "name last_name phone address",
      })
      .populate({
        path: "doctor",
        select: "name last_name _id",
      });

    if (report && report.length !== 0) {
      // Return list of all the reports
      return res.status(200).json({
        message: `List of all reports with status ${req.params.status}`,
        reports: report,
      });
    } else {
      // If no report found with the status
      return res.status(409).json({
        message: `There are no report with status: ${req.params.status}`,
      });
    }
  } catch (err) {
    console.log(`Error in finding reports with specific status: ${err}`);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
