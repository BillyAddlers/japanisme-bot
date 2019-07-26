const LoggingFactory = require("../handler/loggingfactory");
const Logger = new LoggingFactory("DebugEvent");

module.exports = async (client, info) => {
  Logger.debug(
    `${info.replace(
      new RegExp(
        process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN,
        "g"
      ),
      "[TOKEN]"
    )}`
  );
};
