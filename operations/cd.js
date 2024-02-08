import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { isDirectory } from "../helpers/isDirectory.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function cd({ args }) {
  if (!checkArgumentsAmount(args.length, 1)) return;
  const dirPath = toAbsoultePath(args[0]);

  if (!(await checkIfPathExists(dirPath))) {
    Errors.operationError();
    return;
  }

  if (! await isDirectory(dirPath)) {
    Errors.inputError();
    return;
  }

  process.chdir(dirPath);
}
