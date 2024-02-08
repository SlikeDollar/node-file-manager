import fs from "fs/promises";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function rm({ args }) {
  if (!checkArgumentsAmount(args.length, 1)) return
  const filePath = toAbsoultePath(args[0]);

  if (!(await checkIfPathExists(filePath))) {
    Errors.operationError();
    return;
  }

  return fs.rm(filePath)
    .catch(() => Errors.operationError());
}
