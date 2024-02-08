import { stdout } from "process";
import { Errors } from "../constants/errors.js";
import { createReadStream } from "fs";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { isFile } from "../helpers/isFile.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";

export async function cat({ args }) {
  if (!checkArgumentsAmount(args.length, 1)) return;
  const pathToFile = toAbsoultePath(args[0]);

  if (
    !(await checkIfPathExists(pathToFile)) ||
    !(await isFile(pathToFile))
  ) {
    Errors.operationError();
    return;
  }

  const readStream = createReadStream(pathToFile);
  readStream.pipe(stdout);
}
