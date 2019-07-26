const chalk = require("chalk");

class Logger {
  static info(data) {
    return console.info(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(data.name)}||${chalk.red(data.pid)}] ${chalk.green(
        " INFO : "
      )} ${data.message}`
    ); // eslint-disable-line
  }

  static debug(data) {
    return console.debug(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(data.name)}||${chalk.red(data.pid)}] ${chalk.blue(
        " DEBUG: "
      )} ${data.message}`
    ); // eslint-disable-line
  }
  static info(reason) {
    return console.info(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} ${chalk.blue(" INFO: ")} ${reason}`
    );
  }

  static error(reason) {
    return console.error(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} ${chalk.red(" ERROR: ")} ${reason}`
    );
  }
}

module.exports = Logger;
