import fs from 'fs'
import path from 'path';
import { Errors } from '../constants/errors.js';
import { checkIfPathExists } from "../helpers/checkIfPathExists.js";
import { toAbsoultePath } from '../helpers/toAbsolutePath.js';

export async function mv({ args }) {
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
  await fs.promises.rm(filePath, { recursive: true })
    .catch(() => Errors.operationError());
}
