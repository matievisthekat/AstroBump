module.exports = class EventManager {
  constructor(options = {}) {
    this._client = options.client;
    this.dir = options.dir;
  }

  load() {
    const files = this._client.util.findNested(this.dir, ".js");
    if (!files || !files[0]) return "No event files found!";

    for (const file of files) {
      const evnt = new (require(file))();
      if (!evnt || !evnt.exec || !evnt.name) continue;

      this._client.on(evnt.name, evnt.exec.bind(null, this._client));
    }

    return "Loaded events";
  }
};
