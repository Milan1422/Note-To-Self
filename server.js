const express = require("express");
const path = require("path");
const fs = require("fs");
const jsondb = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');
const { json } = require("express");

// Ser up of express app
var app = express();
var PORT = process.env.PORT || 3000;

// express data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// server listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));