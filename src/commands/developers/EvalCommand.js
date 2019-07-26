const CommandCore = require("../../handler/commandcore");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { get, post } = require("node-superfetch");
const { resolve, join } = require("path");
const os = require("os");

module.exports = class EvalCommand extends CommandCore {
  constructor() {
    super({
      name: "eval",
      description: "Evaluate",
      usage: "eval bot",
      cooldown: 5,
      aliases: ["ev", "e"],
      devOnly: true,
      guildOnly: true,
      nsfw: false,
      clientPermission: [],
      authorPermission: []
    });
  }

  async execute(client, message, args, thread) {
    let msg = message; // eslint-disable-line prefer-const
    let bot = client; // eslint-disable-line prefer-const

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("Evaluation")
      .addField("Input", "```js\n" + args.join(" ") + "```"); // eslint-disable-line prefer-template

    try {
      let code = args.slice(0).join(" ");
      if (!code) return;
      let evaled;
      if (code.includes("--silent") && code.includes("--async")) {
        code = code.replace("--async", "").replace("--silent", "");
        await eval(`(async function() {
                    ${code}
                })()`);
        return;
      } else if (code.includes("--async")) {
        code = code.replace("--async", "");
        evaled = await eval(`(async function() {
                    ${code}
                })()`);
      } else if (code.includes("--silent")) {
        code = code.replace("--silent", "");
        await eval(code);
        return;
      } else {
        evaled = await eval(code);
      }

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, {
          depth: 0
        });

      let outputRaw = clean(evaled); // eslint-disable-line prefer-const
      let output = outputRaw.replace(new RegExp(client.token, "g"), "[TOKEN]"); // eslint-disable-line prefer-const
      if (output.length > 1024) {
        const hastebin = await client.util.hastebin(output);
        embed.addField("Output", hastebin);
      } else {
        embed.addField("Output", "```js\n" + output + "```"); // eslint-disable-line prefer-template
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e); // eslint-disable-line prefer-const
      if (error.length > 1024) {
        const hastebin = await client.util.hastebin(error);
        embed.addField("Error", hastebin);
      } else {
        embed.addField("Error", "```js\n" + error + "```"); // eslint-disable-line prefer-template
      }
      message.channel.send(embed);
    }
  }
};

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
  // eslint-disable-line prefer-template
  else return text;
}
