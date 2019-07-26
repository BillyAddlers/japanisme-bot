const LoggingFactory = require("../handler/loggingfactory");
const Logger = new LoggingFactory("ReadyEvent");
const map = new Map();

module.exports = client => {
  Logger.info(`${client.user.tag} is online!`);
  const List = require("../status.json");
  const presence = process.env.DEV ? List.dev_presence : List.presence;
  const status = List.status[getRandom(List.status)];
  let randomPresence = getRandom(presence);
  Logger.info("Starting Interval Status...");
  client.user.setPresence({
    activity: { name: presence[randomPresence] },
    status: status
  });
  setInterval(() => {
    while (map.get("presence") === randomPresence) {
      randomPresence = getRandom(presence);
    }
    map.set("presence", randomPresence);
    client.user.setPresence({
      activity: { name: presence[randomPresence] },
      status: status
    });
  }, 60000);
};

function getRandom(array) {
  const random = Math.floor(Math.random() * array.length);
  return random;
}
