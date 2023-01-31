const express = require("express");
const router = express.Router();
const doctorsController = require("../../../controllers/doctors_controller");

// Doctor Registration
router.post("/register", doctorsController.register);

// Doctor Login
router.post("/login", doctorsController.login);

module.exports = router;
