const { Japanisme } = require('./handler/client');
const client = new Japanisme({
    disableEveryone: true
});

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);