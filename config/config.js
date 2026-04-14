const _ = require("underscore");
const path = require("path");
const util = require("util");

const finalEnvRaw = process.env.NODE_ENV || "development";

// Validate finalEnvRaw to allow only safe environment names (alphanumeric and underscore)
const finalEnv = /^[a-zA-Z0-9_]+$/.test(finalEnvRaw) ? finalEnvRaw.toLowerCase() : "development";

const allConf = require(path.resolve(__dirname + "/../config/env/all.js"));
const envConf = require(path.resolve(__dirname + "/../config/env/" + finalEnv + ".js")) || {};

const config = { ...allConf, ...envConf };

console.log(`Current Config:`);
console.log(util.inspect(config, false, null));

module.exports = config;
