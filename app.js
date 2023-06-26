import { cwd, stdin, stdout } from "process";
import * as readline from "node:readline/promises";
import { logCurrentPath } from "./helpers/log-current-path.js";
import { operations } from "./operations/operations.js";
import { Errors } from "./constants/errors.js";

function onStartUp(username) {
  console.log(`Welcome to the File Manager, ${username}`);
  logCurrentPath();
}

function parseCommnad(data) {
  const command = data.trim().split(/\s/g);
  return {
    operation: command[0],
    args: command.slice(1),
  }
}

async function onRlLine(data) {
  const command = parseCommnad(data);
  if (operations.get(command.operation)) {
    const operationFunc = operations.get(command.operation);
    operationFunc(command.args);
  } else {
    Errors.inputError();
  }

  logCurrentPath();
}

function onExit(username) {
  console.log(`\nThank you for using File Manager, ${username} , goodbye!`);
  process.exit();
}

function runApp() {
  const defaultUsername = "anonymous";
  const username =
    process.argv
      .find((arg) => arg.startsWith("--username="))
      ?.replace("--username=", "") || defaultUsername;

  onStartUp(username);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  rl.on("line", onRlLine);

  process.on("exit", () => onExit(username));
}

runApp();
