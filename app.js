import { cwd, stdin, stdout } from "process";
import * as readline from "node:readline/promises";
import { logCurrentPath } from "./helpers/log-current-path.js";
import { goOneDirectoryUp } from "./operations/up.js";
import { ls } from "./operations/ls.js";
import { cd } from "./operations/cd.js";
import path from "path";
import { Errors } from "./constants/errors.js";

function onStartUp(username) {
  console.log(`Welcome to the File Manager, ${username}`);
  logCurrentPath();
}

async function onRlLine(data) {
  const command = data.trim().split(/\s/g);

  switch (command[0]) {
    case "up":
      goOneDirectoryUp();
      break;
    case "ls":
      ls();
      break;
    case "cd":
      await cd(command[1]);
      break;
    case "cat":
      console.log(":3 - cat");
      break;
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
