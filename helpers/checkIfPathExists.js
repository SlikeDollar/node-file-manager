import fs from "fs/promises";
export async function checkIfPathExists(path) {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}
