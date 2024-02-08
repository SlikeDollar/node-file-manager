import path from "path";
import fs from "fs";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function cp({ args }) {
  if (!checkArgumentsAmount(args.length, 2)) return;
  const [filePath, dirPath] = args.map(path => toAbsoultePath(path));

  if (
    !(await checkIfPathExists(filePath)) ||
    !(await checkIfPathExists(dirPath))
  ) {
    Errors.operationError();
    return;
  }

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(
    path.join(dirPath, path.basename(filePath))
  );

  readStream.pipe(writeStream);
}
