const chalk = require("chalk");

class Logger {

    static info(reason) {
        return console.log(`${chalk.red(`[${new Date().toString().split(" ", 5).join(" ")}]`)} ${chalk.blue(" INFO: ")} ${reason}`);
    }

    static error(reason) {
        return console.error(`${chalk.red(`[${new Date().toString().split(" ", 5).join(" ")}]`)} ${chalk.red(" ERROR: ")} ${reason}`);
    }

}

module.exports = Logger;
