const { Logger } = require('./util/console');
const log = new Logger();
const { ShardingManager } = require('discord.js');
const shards = new ShardingManager('./src/main.js', {
    "totalShards": "auto",
    "token": process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN
});

<<<<<<< HEAD
process.on("unhandledRejection", (err) => {
    log.error('Error handler caught an error : \n' + err.stack);
});

process.on("uncaughtException", (err) => {
    log.error('Error handler caught an error : \n' + err.stack);
    log.info('Fatal error has been detected. Exiting process..');
    process.exit(1);
});

=======
>>>>>>> 8b77ea19fb56d4a167150638ec5e62f747f70bab
shards.on("shardCreate", (shard) => {
    log.info(`Launched Shard ${shard.id}`);
});

shards.spawn("auto", 20000);