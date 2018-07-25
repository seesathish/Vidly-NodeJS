const winston = require('winston');
const mongoose = require("mongoose");

module.exports = function (app) {
    mongoose
        .connect("mongodb://localhost/vidly")
        .then(() => winston.info("Connected to MongoDB..."));        
}
