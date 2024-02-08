import { cwd } from "process";
import { isAbsolute, join } from "path";

export function toAbsoultePath(path) {
  return isAbsolute(path) ? path : join(cwd(), path);
}
