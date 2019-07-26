const { Threadify } = require("synchronous-ify");
const Err = require("./error");
const TreeMap = require("../util/treemap");

module.exports = class CommandCore {
  constructor(meta) {
    this.meta = meta;
    /**
     * @param {string} name
     * override to define the name of command
     */
    this.name = meta.name || undefined;
    /**
     * @param {string} description
     * override to define the description of command
     */
    this.description = meta.description || undefined;
    /**
     * @param {string} usage
     * override to define the usage of command
     */
    this.usage = meta.usage || undefined;
    /**
     * @param {ConstrainLong} cooldown
     * override to define the cooldown of command
     * write 0 to disable cooldown
     */
    this.cooldown = meta.cooldown || null;
    /**
     * @param {Array<string>} aliases
     * override to define the aliases of command
     */
    this.aliases = meta.aliases || [];
    /**
     * @param {boolean} devOnly
     * override to restrict the command only for developers
     */
    this.devOnly = meta.devOnly || false;
    /**
     * @param {boolean} guildOnly
     * override to restrict the command only for guilds
     */
    this.guildOnly = meta.guildOnly || true;
    /**
     * @param {boolean} nsfw
     * override to restrict the command only for nsfw channel
     */
    this.nsfw = meta.nsfw || false;
    /**
     * @param {Array<Permissions>} Permissions
     * override to define permission
     */
    this.clientPermission = meta.clientPermission || [];
    this.authorPermission = meta.authorPermission || [];
  }
  execute(client, message, args, thread) {
    throw new Err("This command is not yet implemented!");
  }
  parse(client, message) {
    if (this.devOnly && !client.config.owners.includes(message.author.id)) {
      message.channel.send(
        ` ❌ **| ${message.author.toString()}, I can't obey your command, Papa!**`
      );
      return false;
    }
    if (this.authorPermission.length) {
      const perms = [];
      for (const perm of this.authorPermission) {
        if (
          !message.member.hasPermission(perm.toUpperCase()) ||
          !client.config.owners.includes(message.author.id)
        ) {
          perms.push(perm);
        }
      }
      if (perms.length) {
        message.channel.send(
          `❌ **| ${message.author.toString()}, You lack ${perms
            .map(x => `▫ | ${x}`)
            .join("\n")} permission nodes to do this, Papa \n**`
        );
        return false;
      }
    }
    if (this.clientPermission.length) {
      const perms = [];
      for (const perm of this.clientPermission) {
        if (!message.guild.me.hasPermission(perm.toUpperCase())) {
          perms.push(perm);
        }
      }
      if (perms.length) {
        message.channel.send(
          `❌ **| ${message.author.toString()}, I don't have enough permissions to do this, Papa! \n** ${perms
            .map(x => `▫ | ${x}`)
            .join("\n")}`
        );
        return false;
      }
    }
    if (this.cooldown) {
      const now = Date.now();
      if (!client.cooldowns.has(this.name)) {
        client.cooldowns.set(this.name, new TreeMap());
      }

      const commandCooldown = client.cooldowns.get(this.name);
      const userCooldown = commandCooldown.get(message.author.id) || 0;
      const estimatedTime = userCooldown + this.cooldown * 1000 - now;

      if (
        userCooldown &&
        !client.config.owners.includes(message.author.id) &&
        estimatedTime > 0
      ) {
        message.channel
          .send(
            `⏱ **| ${message.author.toString()}, You can use this command again in \`${estimatedTime /
              1000}s\`**, Papa!`
          )
          .catch(e => message.channel.send(e.stack, { code: "ini" }));
        return false;
      }
      commandCooldown.set(message.author.id, now);
      client.cooldowns.set(this.name, commandCooldown);
    }
    return true;
  }
  build(client, message, args) {
    if (!this.parse(client, message)) return;
    Threadify.runner(thread => {
      this.execute(client, message, args, thread);
    });
  }
};
