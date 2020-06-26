const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "bump",
      description: "Bump the current server to all other servers",
    });
  }

  exec(msg, args) {
    msg.channel.send("Bumping... Please wait").then(async (m) => {
      msg.client
        .bump({
          bumper: msg.author,
          guildID: msg.guild.id,
        })
        .then((res) => m.edit("", res));
    });
  }
};
