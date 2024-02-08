export function parseCommand(input) {
  const parsingRegex = /^(?<operation>\S+)\s*(?<arguments>(?:(?!--).)*)?(?:\s+(?<flags>(?:--\S+\s*)+)|$)/
  const command = input.match(parsingRegex).groups;
  return {
    operation: command.operation,
    args: command.arguments?.split(/\s/) || [],
    flags: command.flags?.split(/\s/) || [],
  }
}
