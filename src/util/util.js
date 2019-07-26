const request = require("node-superfetch");

module.exports = class Util {
  constructor() {
    this.hastebin = async text => {
      const { body } = await request
        .post("https://hasteb.in/documents")
        .send(text);
      return `https://hasteb.in/${body.key}`;
    };
  }
};
