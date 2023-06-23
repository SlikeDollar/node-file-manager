import { cwd } from "process";
export const logCurrentPath = () => console.log(`You are currently in ${cwd()}`);
