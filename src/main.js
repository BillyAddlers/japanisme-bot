const JapanismeClient = require("./handler/JapanismeClient");
const client = new JapanismeClient({
    disableEveryone: true,
    fetchAllMembers: false
});

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);
