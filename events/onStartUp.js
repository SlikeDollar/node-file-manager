import { logCurrentPath } from "../helpers/logCurrentPath.js";

export function onStartUp(username) {
  console.log(`Welcome to the File Manager, ${username}`);
  logCurrentPath();
}

