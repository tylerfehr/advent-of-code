import { readTextFile } from '../../readfile';

export const DAY_THREE_INPUT_FILE_PATH = <const> './2022/inputs/day-3.txt';

/**
 * Array of rucksack strings
 */
export const rucksacks: string[][] = readTextFile(DAY_THREE_INPUT_FILE_PATH)
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

const generatePriorityLookup = (alphabet: string, offset = 0): PriorityLookup => alphabet.split('')
  .reduce<PriorityLookup>(
    (acc, curr, i) => {
      acc[curr] = (i + 1) + offset;

      return acc;
    },
    {},
  );

const ALPHABET = <const> 'abcdefghijklmnopqrstuvwxyz';

/**
 * Map lowercase alphabet to its priority of 1-6
 */
export const LOWER_PRIORITIES = generatePriorityLookup(ALPHABET);

/**
 * Map uppercase alphabet to its priorities of 27-52
 */
export const UPPER_PRIORITIES = generatePriorityLookup(ALPHABET.toUpperCase(), ALPHABET.length);
