const CommandClient = require("./handler/CommandClient");
const client = new CommandClient({
  path: "commands"
});
client.build();

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);
