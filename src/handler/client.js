const { Client } = require('discord.js');
const { Logger } = require('../util/console');

class Japanisme extends Client {
    constructor(opt) {
        super(opt);

        this.log = new Logger();
<<<<<<< HEAD
        this.config = require('../config.json');
        
=======

>>>>>>> 8b77ea19fb56d4a167150638ec5e62f747f70bab
    } 
}

module.exports = { Japanisme };