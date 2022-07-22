const Doctor = require("./../models/doctor");
const jwt = require("jsonwebtoken");

// Register doctor
module.exports.register = async (req, res) => {
  try {
    // If password and confirm_password doesn't match
    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({
        message: "password mismatch",
      });
    }

    let doctorExist = await Doctor.findOne({ phone: req.body.phone });

    // If phone number of doctor already exists
    if (doctorExist) {
      //  Return doctor exist message
      return res.status(400).json({ message: "Doctor already exists!!" });
    } else {
      // Create a new doctor
      await Doctor.create(req.body);

      return res.status(200).json({
        message: "Doctor is successfully registered",
      });
    }
  } catch (err) {
    console.log("Error in doctor registration", err);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

// Login doctor
module.exports.login = async (req, res) => {
  try {
    let doctorExist = await Doctor.findOne({ phone: req.body.phone });

    // If doctor doesn't exists OR
    // If doctor exists but password does't match
    if (!doctorExist || doctorExist.password !== req.body.password) {
      return res.status(422).json({ message: "Invalid Username/Password" });
    }
    // Successful login and create a json bearer token
    return res.status(200).json({
      message: "Successfuly logged in as a doctor",
      data: {
        token: jwt.sign(doctorExist.toJSON(), "nothing", {
          expiresIn: "360000000",
        }),
      },
    });
  } catch (err) {
    console.log(`Login error : ${err}`);

    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};
