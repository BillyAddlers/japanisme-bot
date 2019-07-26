// const { Japanisme } = require("./handler/client");
const CommandClient = require("./handler/commandclient");
const client = new CommandClient({
    path: "commands"
}, {
    disableEveryone: true,
    fetchAllMembers: false
});
client.build();

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);
