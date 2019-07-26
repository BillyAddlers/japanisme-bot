const LoggingFactory = require("./handler/loggingfactory");
const { ShardingManager } = require("discord.js");
const shards = new ShardingManager("./src/main.js", {
  totalShards: "auto",
  token: process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN
});
const Logger = new LoggingFactory("ShardingManager");

process.on("unhandledRejection", err => {
  Logger.error(`Error handler caught an error : \n${err.stack}`);
});

process.on("uncaughtException", err => {
  Logger.error(`Error handler caught an error : \n${err.stack}`);
  Logger.info("Fatal error has been detected. Exiting process..");
  process.exit(1);
});

shards.on("shardCreate", shard => {
  Logger.info(`Launched Shard ${shard.id}`);
});

shards.spawn("auto", 20000);
