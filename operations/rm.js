import fs from "fs/promises";
import { Errors } from "../constants/errors.js";
import path from "path";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { cwd } from "process";

export async function rm(args) {
  if (args) {
    let filePath = args[0];
    if (!path.isAbsolute(filePath)) {
      filePath = path.join(cwd(), filePath);
    }

    if (!(await checkIfPathExists(filePath))) {
      Errors.operationError();
      return;
    }

    return fs.rm(filePath)
      .catch(() => Errors.operationError());
  }

  Errors.inputError();
}
