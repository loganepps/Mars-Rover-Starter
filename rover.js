const Message = require("./message.js");
const Command = require("./command.js");
class Rover {
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let name = message.name;
    let results = message.commands;
    for (let i = 0; i < results.length; i++) {
      if (results[i].commandType === "STATUS_CHECK") {
        let roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
        results[i] = { completed: true, roverStatus: roverStatus };
      } else if (results[i].commandType === "MODE_CHANGE") {
        if (
          (results[i].completed === false && results[i].value === "NORMAL") ||
          "LOW_POWER"
        ) {
          this.mode = results[i].value;
          results[i] = { completed: true };
        }
      } else if (results[i].commandType === "MOVE" && this.mode === "NORMAL") {
        this.position = results[i].value;
      } else {
        results[i] = { completed: false };
      }
    }
    let response = { message: name, results: results };
    return response;
  }
}

module.exports = Rover;
