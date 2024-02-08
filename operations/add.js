import { Errors } from "../constants/errors.js";
import fs from 'fs';
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";

export async function add({ args }) {
  if (!checkArgumentsAmount(args.length, 1)) return;
  const fileName = args[0]

  if (await checkIfPathExists(fileName)) {
    Errors.inputError();
    return;
  }

  const writeStream = fs.createWriteStream(fileName);
  writeStream.write('');
}
