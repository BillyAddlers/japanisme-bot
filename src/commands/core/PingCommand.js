const CommandCore = require("../../handler/commandcore");
const { MessageEmbed } = require("discord.js");

module.exports = class PingCommand extends CommandCore {
  constructor() {
    super({
      name: "Ping",
      description: "A simple command to ping latency of Discord API",
      usage: "ping",
      cooldown: 5,
      aliases: [],
      devOnly: false,
      guildOnly: false,
      nsfw: false,
      clientPermission: [],
      authorPermission: []
    });
  }
  execute(client, message, args, thread) {
    const start = Date.now();
    const currentmessage = thread.sync(message.channel.send(":ping_pong:"));

    currentmessage.delete();
    const diff = Date.now() - start;
    const API = client.ws.ping.toFixed(2);
    const pingembed = new MessageEmbed()
      .setAuthor("Ping", client.user.displayAvatarURL)
      .setTitle(`:ping_pong: Pong!`)
      .setColor(`RANDOM`)
      .addField("Latency", `${diff}ms`, true)
      .addField("API", `${API}ms`, true);
    return message.channel.send(pingembed);
  }
};
