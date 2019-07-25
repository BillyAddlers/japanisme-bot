const { Client } = require('discord.js');
const { Logger } = require('../util/console');

class Japanisme extends Client {
    constructor(opt) {
        super(opt);

        this.log = new Logger();

    } 
}

module.exports = { Japanisme };