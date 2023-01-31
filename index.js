// Require libraries
const express = require("express");
const port = 8000;
const app = express();

const HospitalAPI = require("./config/mongoose");

// Passport Strategy
const passport = require("passport");
const passportJWTStrategy = require("./config/passport-jwt-strategy");

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Use express router
app.use("/", require("./routes/index"));

// App listening on port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:${err}`);
  } else {
    console.log(`Server is running on port:${port}`);
  }
});
