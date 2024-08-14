const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(12345, (mode = "NORMAL"), (generatorWatts = 110));
    expect(rover).toEqual({
      position: 12345,
      mode: "NORMAL",
      generatorWatts: 110,
    });
  });
  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let rover = new Rover(54321);
    let message = new Message("messageName", []);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe("messageName");
  });
  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let rover = new Rover(67890);
    let message = new Message("messageName", commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
  // TEST 10
  test("responds correctly to the status check command", function () {
    let commands = [new Command("STATUS_CHECK")];
    let rover = new Rover(12345);
    let message = new Message("messageName", commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([
      {
        completed: true,
        roverStatus: { mode: "NORMAL", generatorWatts: 110, position: 12345 },
      },
    ]);
  });
  // TEST 11
  test("responds correctly to the mode change command", function () {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let rover = new Rover(54321);
    let message = new Message("messageName", commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{ completed: true }]);
  });
  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commands = [new Command("MOVE", 21000)];
    let rover = new Rover(12000, "LOW_POWER");
    let message = new Message("messageName", commands);
    let response = rover.receiveMessage(message);
    expect(response.results).toEqual([{ completed: false }]);
  });
  // TEST 13
  test("responds with the position for the move command", function () {
    let commands = [new Command("MOVE", 17000)];
    let rover = new Rover(13000);
    let message = new Message("messageName", commands);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(commands[0].value);
  });
});
