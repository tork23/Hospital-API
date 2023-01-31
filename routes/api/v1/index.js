const express = require("express");
const router = express.Router();

// Doctors route
router.use("/doctors", require("./doctors"));

// Patients route
router.use("/patients", require("./patients"));

// Peports route
router.use("/reports", require("./reports"));

module.exports = router;
