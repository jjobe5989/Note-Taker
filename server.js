// Dependencies
const express = require("express");
const path = require('path');
const fs = require("fs");
const util = require("util");
// const api = require('./routes/noteRoutes')

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api', api);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function () {
  console.log(`App is listening on PORT: ${PORT}`);
});