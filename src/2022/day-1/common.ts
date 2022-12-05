import { readTextFile } from '../../readfile';

export const DAY_ONE_INPUT_FILE_PATH = <const> './2022/inputs/day-1.txt';

/**
 * Each group summed (DRY)
 */
export const sums = readTextFile(DAY_ONE_INPUT_FILE_PATH).split('\n\n')
  .reduce<number[]>(
    (acc, row) => [...acc, row.split('\n').reduce<number>((acc, curr) => acc + +curr, 0)],
    [],
  );
