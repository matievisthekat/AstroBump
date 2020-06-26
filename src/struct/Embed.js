const { MessageEmbed } = require("discord.js");

module.exports = class Embed extends MessageEmbed {
  constructor(...args) {
    super(...args);

    this.color = "BLUE";
  }

  none(msg) {
    return this.setDescription(msg);
  }

  red(msg) {
    return this.setDescription(msg).setColor("RED");
  }

  green(msg) {
    return this.setDescription(msg).setColor("GREEN");
  }
};
