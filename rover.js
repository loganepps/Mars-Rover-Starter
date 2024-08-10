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
        results = { completed: true, roverStatus: roverStatus };
      } else if (results[i].commandType === "MODE_CHANGE") {
        if (
          (results[i].completed === false &&
            results[i].value === "LOW_POWER") ||
          "NORMAL"
        ) {
          this.mode = results[i].value;
          results[i].completed === true;
        }
        results = { completed: true };
      }
    }
    let response = { message: name, results: results };
    return response;
  }
}

module.exports = Rover;
