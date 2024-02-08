import { createBrotliCompress } from "zlib";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import fs from "fs";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function compress({ args }) {
  if (!checkArgumentsAmount(args?.length || 0, 2)) return;

  const [sourceFilePath, destFilePath] = args.map((path) => toAbsoultePath(path));

  if (
    !(await checkIfPathExists(sourceFilePath)) ||
    (await checkIfPathExists(destFilePath))
  ) {
    Errors.operationError();
    return;
  }

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destFilePath);

  readStream.pipe(createBrotliCompress()).pipe(writeStream);
}
