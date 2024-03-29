import fs from "fs/promises";
import { cwd } from "process";

export async function ls() {
  const directoryFiles = await Promise.all(
    (
      await fs.readdir(cwd())
    ).map(async (file) => {
      return {
        name: file,
        type: (await fs.lstat(file)).isDirectory() ? "directory" : "file",
      };
    })
  );

  const sortedDirectoryFiles = directoryFiles.sort((a, b) => {

    if (a.type === "directory" && b.type !== "directory") {
      return -1;
    }

    if (a.type !== "directory" && b.type === "directory") {
      return 1;
    }

    return a.name.localeCompare(b.name);
  });

  console.table(sortedDirectoryFiles);
}
