import path from 'path';

export function goOneDirectoryUp() {
  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  if (currentDir !== parentDir) {
    process.chdir(parentDir);
  }
}
