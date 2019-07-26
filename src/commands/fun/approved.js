const CommandCore = require("../../handler/commandcore");
const { get } = require("node-superfetch");

class ApprovedCommand extends CommandCore {
	constructor() {
		super({
			name: "approved", 
			description: "Draws an \"approved\" stamp over a user\'s avatar.", 
			usage: "approved <user>", 
			cooldown: 5,
			aliases: ["approve"],
			devOnly: false,
			guildOnly: true,
			nsfw: false, 
			clientPermission: ["ATTACH_FILES"], 
			authorPermission: []
		});
	}
	execute(client, message, args, thread) {
		const user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
		const { body } = thread.sync(get(`https://emilia-api.glitch.me/api/approved?image=${user.displayAvatarURL({ format: "png", size: 1024 })}`));
		return message.channel.send({ files: [ { attachment: body } ] });
	}
}

module.exports = ApprovedCommand;
