"use strict";

var express = require("express");
const bodyParser = require("body-parser");
var expressApp = express().use(bodyParser.json());
var Config = require("./config"),
port = process.env.PORT || Config.port,
ENV = process.env.NODE_ENV || Config.env

const DialogflowHandler = require("./app/handlers/dialogflowApp");
require("./config/mongoose")(expressApp)

// EXPRESS APP fulfillment route (POST). The entire dialogFlowApp object (incl its handlers) is the callback handler for this route.
expressApp.post("/", DialogflowHandler);


//  EXPRESS APP test route (GET)
expressApp.get("/", (req, res) => {
  res.send("CONFIRMED RECEIPT OF GET.");
});

  expressApp.listen(port, () =>
    console.log(`*** SERVER RUNNING LOCALLY ON PORT ${port} ***`)
  );