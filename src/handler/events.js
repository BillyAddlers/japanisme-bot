const fs = require("fs");
const { join } = require("path");

module.exports = client => {
  const events = fs.readdirSync(join("./src", "events"));
  for (const Event of events) {
    if (!Event.endsWith(".js")) return;
    const file = require(`../events/${Event}`);
    client.on(Event.split(".")[0], async (...args) => file(client, ...args));
  }
};
