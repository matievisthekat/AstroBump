const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "setdesc",
      description: "Set the description for the server",
    });
  }

  async exec(msg, args) {
    const desc = args.join(" ");
    if(desc.length > 1024) return msg.channel.send(new msg.client.embed().red("Uh-oh. Looks like your description is too long. Try shortening it"));

    const data = await msg.client.models.bumpData.findOne({
      guildID: msg.guild.id,
    }) || new msg.client.models.bumpData({
      guildID: msg.guild.id
    })

    data.desc = desc;

    await data.save();

    msg.channel.send(new msg.client.embed().green("This servers description has been set"))
  }
};
