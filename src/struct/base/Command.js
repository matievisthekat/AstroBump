module.exports = class BaseCommand {
  constructor({ name = undefined, description = "Command description" }) {
    this.name = name;
    this.description = description;
  }

  exec(msg, args) {
    throw new Error(`Command not implemented: ${this.name}`);
  }
};
