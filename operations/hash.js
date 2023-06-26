import crypto from "crypto";
import fs from "fs";
import { cwd, stdout } from "process";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import path from "path";

export async function hash(args) {
  let filePath = args[0];

  if (!filePath) {
    Errors.inputError();
    return;
  }

  if (!path.isAbsolute(filePath)) {
    filePath = path.join(cwd(), filePath);
  }

  if (!(await checkIfPathExists(filePath))) {
    Errors.operationError();
    return;
  }

  fs.createReadStream(filePath)
    .pipe(crypto.createHash("sha256").setEncoding("hex"))
    .pipe(stdout);
}
