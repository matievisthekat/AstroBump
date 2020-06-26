const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "support",
      description: "Get an invite to the support server",
    });
  }

  exec(msg, args) {
    msg.channel.send(
      new msg.client.embed().none(
        `Here is an invite to my support server: ${msg.client.config.support_invite}`
      )
    );
  }
};
