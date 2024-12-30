import { MdeCommandMapProps } from './command';
/**
 * Returns a flat array of commands that can be activated by the keyboard.
 * When keydowns happen, these commands 'handleKeyCommand' will be executed, in this order,
 * and the first that returns true will be executed.
 */
export declare function extractKeyActivatedCommands(commandMap: MdeCommandMapProps): string[];
