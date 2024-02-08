export function checkArgumentsAmount(argsAmount, neededArgumentsAmount) {
  if (argsAmount > neededArgumentsAmount) {
    console.error("too many arguments");
    return false;
  }

  if (argsAmount < neededArgumentsAmount) {
    console.error("too few arguments provided");
    return false;
  }

  return true
}
