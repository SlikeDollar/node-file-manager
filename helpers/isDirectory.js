import fs from "fs/promises";

export async function isDirectory(path) {
  return (await (fs.stat(path))).isDirectory();
}
