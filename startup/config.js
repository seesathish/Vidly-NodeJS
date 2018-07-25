const config = require("config");

module.exports = function () {
    if (!config.get("jwtPrivatKey")) {
        throw new Error("FATAL ERROR: jwtPrivateKey not defined...");        
    }
}
