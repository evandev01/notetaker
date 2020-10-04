// Require Dependencies [express, file system, path]
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express[to run on port 3000]
const app = express();
const PORT = process.env.PORT || 3000;

//Data parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//Require routes
require('./routes/routes')(app);

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  