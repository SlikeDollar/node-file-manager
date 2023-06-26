import { createBrotliCompress } from "zlib";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import fs from "fs";
import path from "path";
import { cwd } from "process";

export async function compress(args) {
  let [sourceFilePath, destFilePath] = args;
  if (!sourceFilePath || !destFilePath) {
    Errors.inputError();
    return;
  }

  if (!path.isAbsolute(sourceFilePath)) {
    sourceFilePath = path.join(cwd(), sourceFilePath);
  }

  if (!path.isAbsolute(destFilePath)) {
    destFilePath = path.join(cwd(), destFilePath);
  }

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
