const { Logger } = require('./src/util/console');
const log = new Logger();

require('dotenv').config();

<<<<<<< HEAD
if (process.argv[2] === "dev") {
    log.info("Bot ini sedang dalam dev mode !");
=======
if (process.argv[2] === 'dev') {
    log.info('Bot ini sedang dalam dev mode !');
>>>>>>> 8b77ea19fb56d4a167150638ec5e62f747f70bab
    process.env.DEV = 'dev';
    require('./src/shards');
} else {
    log.info('Bot ini sedang dalam normal mode !');
    require('./src/shards');
}