const config = require("../config.json");

module.exports = (client, message) => {
  const prefix = process.env.DEV ? config.dev_prefix : config.prefix;
  const args = message.content
    .substring(prefix.length)
    .trim()
    .split(" ");

  if (!message.content.startsWith(prefix)) return;
  try {
    require("../handler/command")(client, message);
  } catch (e) {
    console.error(e.stack);
  }
};
