import path from "path";
import { cwd, stdout } from "process";
import fs from "fs/promises";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { createReadStream } from "fs";

export async function cat(args) {
  try {
    if (args) {
      let pathToFile = args[0];
      if (!path.isAbsolute(pathToFile)) {
        pathToFile = path.join(cwd(), pathToFile);
      }

      if (
        !(await checkIfPathExists(pathToFile)) ||
        !(await fs.stat(pathToFile)).isFile()
      ) {
        Errors.operationError();
        return;
      }

      const readStream = createReadStream(pathToFile);
      readStream.pipe(stdout);
      return;
    }

    Errors.inputError();
  } catch (err) {
    console.log(err);
  }
}
