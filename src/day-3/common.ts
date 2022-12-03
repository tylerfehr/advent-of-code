import { readTextFile } from '../readfile';

export const DAY_THREE_INPUT_FILE_PATH = <const> './inputs/day-3/part-1.txt';

/**
 * Array of rucksack strings
 */
export const rucksacks = readTextFile(DAY_THREE_INPUT_FILE_PATH)
  .split('\n')
  .map((r) => r.split(''));

/**
 * Split rucksack into two equal halves
 */
export const splitRucksackInTwo = (rucksack: string[]): RucksackCompartments => {
  const half = Math.floor(rucksack.length / 2);

  return [rucksack.slice(0, half), rucksack.slice(half, rucksack.length)];
}

/**
 * Alpha priority value lookup
 */
export type PriorityLookup = Record<string, number>;

/**
 * Tuple containing the first and second rucksack compartments
 */
export type RucksackCompartments = [firstHalf: string[], secondHalf: string[]];

const generatePriorityLookup = (alphabet: string, offset = 0): PriorityLookup => {
  return alphabet.split('').reduce<PriorityLookup>(
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
