const express = require("express");
const route = express.Router();

route.use("/v1", require("./v1"));

console.log("Router loaded");

module.exports = route;
