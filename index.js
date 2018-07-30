const winston = require('winston');
const express = require("express");
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

// setting enviromental variable - $env:PORT=5000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

//for integration Test
module.exports = server;


// Set environment for  jwtPrivatKey -> $env:vidly_jwtPrivatekey = "SecretKey"
// To run Test environment $env:NODE_ENV="test" then node index.js
