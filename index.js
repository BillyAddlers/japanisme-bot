const Logger = require("./src/util/console");
require("dotenv").config();

if (process.argv[2] === "dev") {
    Logger.info("Bot ini sedang dalam dev mode !");
    process.env.DEV = "dev";
    require("./src/shards");
} else {
   Logger.info("Bot ini sedang dalam normal mode !");
    require("./src/shards");
}
