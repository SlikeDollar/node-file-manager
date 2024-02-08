import { logCurrentPath } from "../helpers/log-current-path.js";

export function onStartUp(username) {
  console.log(`Welcome to the File Manager, ${username}`);
  logCurrentPath();
}

