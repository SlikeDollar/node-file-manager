import { Errors } from "../constants/errors.js";
import { logCurrentPath } from "../helpers/logCurrentPath.js";
import { parseCommand } from "../helpers/parseCommand.js";
import { operations } from "../operations/operations.js";

export async function onRlLine(input) {
  const command = parseCommand(input);
  const operationFunc = operations.get(command.operation);

  if (operationFunc) {
    await operationFunc(command);
  } else {
    Errors.inputError();
  }

  logCurrentPath();
}
