import { Errors } from "../constants/errors.js";
import fs from 'fs';
import { checkIfPathExists } from "../helpers/check-if-path-exists.js";

export async function add(args) {
    const fileName = args[0]
    if (!fileName || (await checkIfPathExists(fileName))) {
      Errors.inputError();
      return;
    }

    const writeStream = fs.createWriteStream(fileName);
    writeStream.write('');
}
