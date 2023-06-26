import path from "path";
import fs from "fs";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { cwd } from "process";

export async function cp(args) {
  let [filePath, dirPath] = args;
  if (!filePath || !dirPath) {
    Errors.inputError();
    return;
  }

  if (!path.isAbsolute(filePath)) {
    filePath = path.join(cwd(), filePath);
  }

  if (!path.isAbsolute(dirPath)) {
    dirPath = path.join(cwd(), dirPath);
  }

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
