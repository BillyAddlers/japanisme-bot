const { Japanisme } = require("./handler/client");
const client = new Japanisme({
    disableEveryone: true,
    fetchAllMembers: false
});

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);
