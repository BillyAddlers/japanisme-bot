global.Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const { join, resolve } = require("path");
const Japanisme = require("./JapanismeClient");
const TreeMap = require("../util/treemap");
const LoggingFactory = require("./loggingfactory");
const Util = require("../util/util");

module.exports = class CommandClient extends Japanisme {
  constructor(options, djsopt) {
    super(djsopt);
    this.path = options.path;
    this.commands = new TreeMap();
    this.aliases = new TreeMap();
    this.cooldowns = new TreeMap();
    this.util = new Util();
  }

  /**
   * @getter
   */
  get Commands() {
    return this.commands;
  }
  get Aliases() {
    return this.aliases;
  }

  build() {
    const logger = new LoggingFactory(this);
    const modules = fs.readdirSync(join("./src", this.path));
    for (const Module of modules) {
      logger.print(`${Module} Loaded!`);
      const commands = fs.readdirSync(join("./src", this.path, Module));
      for (const file of commands) {
        const Command = require(`../${this.path}/${Module}/${file}`);
        const resolved = new Command();
        if (resolved.constructor.name !== file.split(".")[0]) {
          const errors = new Error();
          errors.name = "ANOMALY_CLASS_FILENAME";
          errors.message = `[${
            file.split(".")[0]
          }] classname is not found in ${resolve(
            __dirname,
            `../${this.path}/${Module}/${file}`
          )}`;
          throw errors;
        }
        resolved.category = Module;
        logger.print(`Resolving command ${resolved.name}`);
        this.commands.set(resolved.name.toLowerCase(), resolved);
        for (const alias of resolved.aliases) {
          this.aliases.set(alias.toLowerCase(), resolved.name.toLowerCase());
        }
      }
    }
  }
};
