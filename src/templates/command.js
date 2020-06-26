const Command = require("../struct/base/Command");

module.exports = class extends Command {
  constructor() {
    super({
      name: "",
      description: "",
    });
  }

  exec(msg, args) {}
};
