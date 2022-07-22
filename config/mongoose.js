// Require Mongoose
const mongoose = require("mongoose");

// Connect to mongodb
mongoose.connect("mongodb://localhost/HospitalAPI");

// Acquire the connection
const db = mongoose.connection;

// Error Handling
db.on(
  "error",
  console.error.bind(console, "Error connecting to the database :: MongoDB")
);

// On successful connection
db.once("open", () =>
  console.log("Successfully connected to the db :: MongoDB")
);

module.exports = db;
