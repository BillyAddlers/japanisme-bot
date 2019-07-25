const { Logger } = require('./util/console');
const log = new Logger();
const { ShardingManager } = require('discord.js');
const shards = new ShardingManager('./src/main.js', {
    "totalShards": "auto",
    "token": process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN
});

shards.on("shardCreate", (shard) => {
    log.info(`Launched Shard ${shard.id}`);
});

shards.spawn("auto", 20000);