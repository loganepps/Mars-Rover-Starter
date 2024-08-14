const Message = require("../message.js");
const Command = require("../command.js");

describe("Message class", function () {
  // TEST 4
  test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
    expect(function () {
      new Message();
    }).toThrow(new Error("A name is required."));
  });
  // TEST 5
  test("constructor sets name", function () {
    let testMessage = new Message("messageName", []);
    expect(testMessage.name).toBe("messageName");
  });
  // TEST 6
  test("contains a commands array passed into the constructor as the 2nd argument", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let testMessage = new Message("messageName", commands);
    expect(testMessage.commands).toEqual([
      { commandType: "MODE_CHANGE", value: "LOW_POWER" },
      { commandType: "STATUS_CHECK", value: undefined },
    ]);
  });
});
