import os from 'os';

export function operatingSystem({ flags }) {
  if (!flags.length) {
    console.log("no flags provided");
    return;
  };

  const possibleFlags = {
    "--EOL": os.EOL,
    "--cpus": os.cpus()[0],
    "--homedir": os.homedir(),
    "--username": os.userInfo().username,
    "--architecture": os.arch(),
  }

  flags.forEach(flag => {
    console.log(`${possibleFlags[flag]}\n` || `Undefined flag - ${flag}`);
  });
}
