import { Errors } from "../constants/errors.js";
import fs from 'fs';
import { checkArgumentsAmount } from "../helpers/checkArgumentsAmount.js";
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";

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
