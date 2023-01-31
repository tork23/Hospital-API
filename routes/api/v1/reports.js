const express = require("express");
const router = express.Router();
const reportsController = require("../../../controllers/reports_controller");

// List all the reports of all the patients filtered by a specific status
router.get("/:status", reportsController.status);

module.exports = router;
