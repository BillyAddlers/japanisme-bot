const { Client } = require("discord.js");
const Logger = require("../util/console");

class Japanisme extends Client {

    constructor(opt) {
        super(opt);

        this.log = Logger;
        this.config = require("../config.json");
    }

}

module.exports = { Japanisme };
