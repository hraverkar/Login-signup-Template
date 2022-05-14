var config = require("./config");
config.uri ="mongodb://localhost:27017/?readPreference=primary&ssl=false";

config.unsecureport = 3000;

module.exports = config;