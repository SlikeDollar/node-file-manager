import fs from "fs/promises";
import { cwd } from "process";
import { Errors } from "../constants/errors";

export async function ls() {
  const currentPath = cwd();
  try {
    const directoryFiles = await Promise.all(
      (
        await fs.readdir(currentPath)
      ).map(async (file) => {
        return {
          name: file,
          type: (await fs.lstat(file)).isDirectory() ? "directory" : "file",
        };
      })
    );
    console.table(directoryFiles);
  } catch (err) {
    console.error(Errors.operationError);
  }
}
