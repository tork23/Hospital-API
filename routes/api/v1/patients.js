const express = require("express");
const router = express.Router();
const patientsController = require("../../../controllers/patients_controller");
const Patient = require("../../../models/patient");
const passport = require("passport");

// Show all the patients
router.get("/all_patients", async (req, res) => {
  const patient = await Patient.find({});
  return res.send(patient);
});

// Patient Registration
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientsController.register
);

// Report Creation
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientsController.createReport
);

// List all the reports of a patient oldest to latest
router.get(
  "/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  patientsController.allReports
);

module.exports = router;
