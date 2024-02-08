import { createBrotliDecompress } from "zlib";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";
import fs from "fs";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";

export async function decompress({ args }) {
  if (!checkArgumentsAmount(args.length, 2)) return;
  const [sourceFilePath, destFilePath] = args.map(path => toAbsoultePath(path));

  if (
    !(await checkIfPathExists(sourceFilePath)) ||
    (await checkIfPathExists(destFilePath))
  ) {
    Errors.operationError();
    return;
  }

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destFilePath);

  readStream.pipe(createBrotliDecompress()).pipe(writeStream);
}
