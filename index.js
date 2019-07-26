require("dotenv").config();
const LoggingFactory = require("./src/handler/loggingfactory");
const log = new LoggingFactory("MainProcess");

if (process.argv[2] === "dev") {
    log.info("Bot ini sedang dalam dev mode !");
    process.env.DEV = "dev";
    require("./src/shards");
} else {
    log.info("Bot ini sedang dalam normal mode !");
    require("./src/shards");
}
