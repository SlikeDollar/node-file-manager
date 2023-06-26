import { cwd } from "process";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import fs from "fs/promises";
import path from "path";

export async function cd(args) {
  if (args) {
    let dirPath = args[0];
    if (!path.isAbsolute(dirPath)) {
      dirPath = path.join(cwd(), dirPath);
    }

    if (!(await checkIfPathExists(dirPath))) {
      Errors.operationError();
      return;
    }

    if (!(await fs.stat(dirPath)).isDirectory()) {
      Errors.inputError();
      return;
    }

    process.chdir(dirPath);
    return;
  }

  Errors.inputError();
}
