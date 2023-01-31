// Require Mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/HospitalAPI");

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
