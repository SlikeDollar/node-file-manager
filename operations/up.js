import { cd } from './cd.js';

export async function goOneDirectoryUp() {
  await cd({ args: ['..'] });
}
