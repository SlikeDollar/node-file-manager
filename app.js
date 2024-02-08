import { stdin, stdout } from "process";
import * as readline from "node:readline/promises";
import { onStartUp } from "./events/onStartUp.js";
import { onExit } from "./events/onExit.js";
import { onRlLine } from "./events/onRlLine.js";

function main() {
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

main();
