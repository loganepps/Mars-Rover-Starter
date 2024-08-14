const Command = require("../command.js");

describe("Command class", function () {
  // TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(function () {
      new Command();
    }).toThrow(new Error("Command type required."));
  });

  // TEST 2
  test("constructor sets command type", function () {
    let testCommand = new Command("TEST", "someValue");
    expect(testCommand.commandType).toBe("TEST");
  });

  // TEST 3
  test("constructor sets a value passed in as the 2nd argument", function () {
    let testCommand = new Command("TEST", 10000);
    expect(testCommand.value).toBe(10000);
  });
});
