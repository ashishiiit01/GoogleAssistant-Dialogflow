
module.exports = {
    // host: "127.0.0.1",
    port: process.env.PORT, // change with production port
    mongoUrl: process.env.CONNECTION_STRING,
    logLevel: process.env.LOG_LEVEL,
    secret: process.env.SECRET,
    iss: process.env.ISS,
   	aud: process.env.AUD
};