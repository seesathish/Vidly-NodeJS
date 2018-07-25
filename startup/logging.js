const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

    // Below code is not working as not logged to file when uncaught exceptions - Need to fix!!!
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'logfile.log' })
    );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'uncaughtExceptions.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'
    });    
}