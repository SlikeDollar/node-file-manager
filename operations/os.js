import os from 'os';

export function operatingSystem(args) {
  switch (args[0]) {
    case "--EOL":
      console.log(os.EOL);
      break;
    case "--cpus":
      console.log(...os.cpus());
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
  }
}
