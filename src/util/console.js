const chalk = require('chalk');

class Logger {
    constructor() {
        this.info = function info(reason) {
            console.info(`${chalk.red(`[${new Date().toString().split(" ", 5).join(" ")}]`)} ${chalk.blue(' INFO: ')} ${reason}`); 
        };

        this.error = function error(reason) {
            console.error(`${chalk.red(`[${new Date().toString().split(" ", 5).join(" ")}]`)} ${chalk.red(' ERROR: ')} ${reason}`); 
        };
    }
}

module.exports = { Logger };