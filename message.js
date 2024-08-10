const Command = require("./command");

class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("A name is required.");
    }
    this.commands = commands;
  }
}

module.exports = Message;
