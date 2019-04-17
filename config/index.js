const env = process.env.NODE_ENV || "development";

const Config = require( `./environments/${ env.toLowerCase( ) }` ); // eslint-disable-line import/no-dynamic-require

module.exports = Config;
