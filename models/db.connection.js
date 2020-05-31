/** packages */
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");

/** db connection info */
const dbInfo = config.get("database");
const connectionString = `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.dbname}`;

/** messages color */
const connectedColor = chalk.bold.green;
const disconnectedColor = chalk.bold.cyan;
const errorColor = chalk.bold.red;
const downColor = chalk.bold.magenta;

module.exports = () => {
    mongoose.connect(connectionString);

    mongoose.connection.on("connected", () => {
        console.log(connectedColor("The connection has been stablished successfuly."));
    });

    mongoose.connection.on("disconnected", () => {
        console.log(disconnectedColor("The connection has been closed."));
    });

    mongoose.connection.on("error", () => {
        console.log(errorColor("Error connecting to database."));
    });

    mongoose.connection.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log(downColor("The server is down."));
        });
    });

}