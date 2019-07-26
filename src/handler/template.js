const CommandCore = require("../../handler/commandcore");

module.exports = class Name extends CommandCore {
  constructor() {
    super({
      name: "",
      description: "",
      usage: "",
      cooldown: 0,
      aliases: [],
      devOnly: Boolean,
      guildOnly: Boolean,
      nsfw: Boolean,
      clientPermission: [],
      authorPermission: []
    });
  }

  // eslint-disable-next-line no-empty-function
  execute(client, message, args, thread) {}
};
