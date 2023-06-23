import { stdin, stdout } from "process";
import * as readline from "node:readline/promises";
import { logCurrentPath } from "./helpers/log-current-path.js";
import { goOneDirectoryUp } from "./operations/up.js";
import { ls } from "./operations/ls.js";

function onStartUp(username) {
  console.log(`Welcome to the File Manager, ${username}`);
  logCurrentPath();
}

function onRlLine(data) {
  const command = data.trim();
  if (command.startsWith("up")) {
    goOneDirectoryUp();
  }
  else if (command.startsWith("ls")) {
    ls();
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
