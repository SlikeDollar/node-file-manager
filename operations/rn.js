import fs from "fs/promises";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import path from "path";
import { cwd } from "process";

export async function rn(args) {
  let [pathToFile, fileName] = args;
  if (!pathToFile || !fileName) {
    Errors.inputError();
    return;
  }

  if (!path.isAbsolute(pathToFile)) {
    pathToFile = path.join(cwd(), pathToFile);
  }

  if (
    (await checkIfPathExists(fileName)) ||
    !(await checkIfPathExists(pathToFile))
  ) {
    Errors.operationError();
  }

  fileName = path.join(path.dirname(pathToFile), path.basename(fileName));

  fs.rename(pathToFile, fileName).catch(() => Errors.operationError());
}
