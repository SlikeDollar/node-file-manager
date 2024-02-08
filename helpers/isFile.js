import fs from "fs/promises";

export async function isFile(path) {
  return (await (fs.stat(path))).isFile();
}
