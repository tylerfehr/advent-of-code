import { readTextFile } from '../readfile';

export const DAY_THREE_INPUT_FILE_PATH = <const> './inputs/day-3/part-1.txt';

/**
 * Rucksacks, each split into the two compartments by a tuple
 */
export const splitRucksacks = readTextFile(DAY_THREE_INPUT_FILE_PATH)
    .split('\n')
    .reduce<RucksackCompartments[]>(
        (acc, curr) => {
            const compartmentSplit = Math.floor(curr.length / 2);

            const firstHalf = curr.slice(0, compartmentSplit);
            const secondHalf = curr.slice(compartmentSplit + 1, curr.length);

            return [...acc, [firstHalf, secondHalf]];
        },
        [],
    );

/**
 * Alpha priority value lookup
 */
export type PriorityLookup = Record<string, number>;

/**
 * Tuple containing the first and second rucksack compartments
 */
export type RucksackCompartments = [firstHalf: string, secondHalf: string];

const generatePriorityLookup = (alphabet: string, offset = 0): PriorityLookup => {
    return alphabet.split('')
    .reduce<PriorityLookup>(
        (acc, curr, i) => {

            acc[curr] = (i + 1) + offset;

            return acc;
        },
        {},
    );
}

const CAPITAL_PRIORITY_OFFSET = <const> 26;

/**
 * Map lowercase alphabet to its priority of 1-6
 */
export const LOWER_PRIORITIES = generatePriorityLookup('abcdefghijklmnopqrstuvwxyz');

/**
 * Map uppercase alphabet to its priorities of 27-52
 */
export const UPPER_PRIORITIES = generatePriorityLookup('ABCDEFGHIJKLMNOPQRSTUVWXYZ', CAPITAL_PRIORITY_OFFSET);
