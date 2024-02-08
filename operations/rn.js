import fs from "fs/promises";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";
import path from "path";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function rn({ args }) {
  if (!checkArgumentsAmount(args.length, 2)) return;
  let [pathToFile, fileName] = args.map((path) => toAbsoultePath(path));

  if (
    (await checkIfPathExists(fileName)) ||
    !(await checkIfPathExists(pathToFile))
  ) {
    Errors.operationError();
  }

  fileName = path.join(path.dirname(pathToFile), path.basename(fileName));
  fs.rename(pathToFile, fileName).catch(() => Errors.operationError());
}
