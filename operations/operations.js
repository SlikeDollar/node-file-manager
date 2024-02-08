import { add } from "./add.js";
import { cat } from "./cat.js";
import { cd } from "./cd.js";
import { compress } from "./compress.js";
import { cp } from "./cp.js";
import { decompress } from "./decompress.js";
import { hash } from "./hash.js";
import { ls } from "./ls.js";
import { mv } from "./mv.js";
import { operatingSystem } from "./os.js";
import { rm } from "./rm.js";
import { rn } from "./rn.js";
import { goOneDirectoryUp } from "./up.js";

export const operations = new Map([
  ["up", goOneDirectoryUp],
  ["ls", ls],
  ["cd", cd],
  ["cat", cat],
  ["add", add],
  ["rn", rn],
  ["cp", cp],
  ["mv", mv],
  ["rm", rm],
  ["os", operatingSystem],
  ["hash", hash],
  ["compress", compress],
  ["decompress", decompress],
]);
