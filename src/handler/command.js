const config = require("../config.json");
const { Threadify } = require("synchronous-ify");
const LoggingFactory = require("../handler/loggingfactory");
const Logger = new LoggingFactory("CommandHandler");

module.exports = (client, message) => {
  const prefix = process.env.DEV ? config.dev_prefix : config.prefix;
  const args = message.content
    .substring(prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (!cmd.parse(client, message)) return;
  try {
    Threadify.runner(stream => {
      cmd.execute(client, message, args, stream);
    });
  } catch (e) {
    Logger.error(e.stack);
  } finally {
    Logger.debug(
      `[SHARD #${client.shard.ids[0]}] ${message.author.tag} is using ${
        cmd.name
      } command on ${message.guild.name}`
    );
  }
};
