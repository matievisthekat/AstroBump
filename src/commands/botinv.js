const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "botinv",
      description: "Get an invite for this bot",
    });
  }

  async exec(msg, args) {
    msg.channel.send(
      new msg.client.embed().none(
        `Here is an invite for me: ${await msg.client.generateInvite([
          "CREATE_INSTANT_INVITE",
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
          "MANAGE_MESSAGES",
          "EMBED_LINKS",
          "ATTACH_FILES",
        ])}`
      )
    );
  }
};
