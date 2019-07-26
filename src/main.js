const CommandClient = require("./handler/commandclient");
const client = new CommandClient({
  path: "commands"
});
client.build();

require("./handler/events")(client);
client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);
