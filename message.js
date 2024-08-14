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

// let commands = [
//   new Command("MODE_CHANGE", "LOW_POWER"),
//   new Command("STATUS_CHECK"),
// ];
// let message = new Message("messageName", commands);
// console.log(message.commands.length);

module.exports = Message;
