import { readTextFile } from '../readfile';

export const PART_ONE_INPUT_FILE_PATH = './inputs/day-1/part-1.txt';

/**
 * Each group summed
 */
export const sums = readTextFile(PART_ONE_INPUT_FILE_PATH).split('\n\n')
  .reduce<number[]>(
    (acc, row) => [...acc, row.split('\n').reduce<number>((acc, curr) => acc + +curr, 0)],
    [],
  );
