import { readTextFile } from '../../readfile';

export const DAY_NINE_INPUT_FILE_PATH = './2022/inputs/day-25.txt';

/**
 * Parsed snafu number array
 */
export const snafuNumbers = readTextFile(DAY_NINE_INPUT_FILE_PATH)
  .trim()
  .split('\n');

/**
 * Special notation values
 */
export const SPECIAL_CASES: Record<string, number> = {
  '-': -1,
  '=': -2,
};

/**
 * The constant exponent we'll need for each value we parse
 */
export const SNAFU_BASE = <const> 5;

/**
 * Convert a snafu number (base 5) to decimal (base 10)
 */
export const convertSnafuToDecimal = (snafuNumber: string): number => snafuNumber.split('').reduce<number>(
  (acc, curr, i) => {
    // e.g. 2=-01
    const place = Math.pow((snafuNumber.length - 1) - i, SNAFU_BASE);

    // if not a special value, convert the undefined index value to the current value
    const numericalValue = SPECIAL_CASES[curr] ?? curr;

    return acc + (place * numericalValue);
  },
  0,
);

// TODO:
export const convertDecimalNumberToSnafu = (decimalNumber: number): string => {
  return '';
};
