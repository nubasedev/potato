/**
 * Returns a flat array of commands that can be activated by the keyboard.
 * When keydowns happen, these commands 'handleKeyCommand' will be executed, in this order,
 * and the first that returns true will be executed.
 */
export function extractKeyActivatedCommands(commandMap) {
    const result = [];
    for (const command in commandMap) {
        if (!commandMap.hasOwnProperty.call(commandMap, command)) {
            continue;
        }
        if (!commandMap[command]().handleKeyCommand) {
            continue;
        }
        result.push(command);
    }
    return result;
}
