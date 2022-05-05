const express = require("express");
const app = express();
app.use(express.json()); // Enable express to parse JSON as request body.
const protectedRoutes = require("./protected.routes");

app.use(protectedRoutes);

module.exports = app;