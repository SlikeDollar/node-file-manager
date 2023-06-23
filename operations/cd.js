import { cwd } from "process";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import fs from "fs/promises";
import path from "path";

export async function cd(dirPath) {
  if (dirPath) {
    if (!path.isAbsolute(dirPath)) {
      dirPath = path.join(cwd(), dirPath);
    }
    if (!(await checkIfPathExists(dirPath))) {
      console.error(Errors.operationError);
      return;
    }

    if (!(await fs.stat(dirPath)).isDirectory()) {
      console.error(Errors.inputError);
      return;
    }

    process.chdir(dirPath);
    return;
  }

  console.error(Errors.inputError);
}
