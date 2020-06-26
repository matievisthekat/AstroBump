module.exports = class BaseEvent {
  constructor(name) {
    this.name = name;
  }

  exec(client) {
    throw new Error(`Event not implemented: ${this.name}`);
  }
};
