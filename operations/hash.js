import crypto from "crypto";
import fs from "fs";
import { cwd, stdout } from "process";
import { Errors } from "../constants/errors.js";
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { toAbsoultePath } from "../helpers/toAbsolutePath.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function hash({ args }) {
  if (!checkArgumentsAmount(args.length, 1)) return
  const filePath = toAbsoultePath(args[0]);

  if (!(await checkIfPathExists(filePath))) {
    Errors.operationError();
    return;
  }

  fs.createReadStream(filePath)
    .pipe(crypto.createHash("sha256").setEncoding("hex"))
    .pipe(stdout);
}
