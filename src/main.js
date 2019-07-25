const { Japanisme } = require('./handler/client');
const client = new Japanisme({
<<<<<<< HEAD
    disableEveryone: true,
    fetchAllMembers: false
=======
    disableEveryone: true
>>>>>>> 8b77ea19fb56d4a167150638ec5e62f747f70bab
});

client.login(process.env.DEV ? process.env.DEV_TOKEN : process.env.TOKEN);