import { readTextFile } from "../../readfile";

const DAY_SIX_INPUT_FILE_PATH = <const> './2022/inputs/day-6.txt';

/**
 * Transmission string
 */
export const transmission = <string> readTextFile(DAY_SIX_INPUT_FILE_PATH);

/**
 * Get start of distinct window with specified windowSize
 * 
 * Note: this would be faster using a traditional for-loop since you
 * can exit early with `break` after finding the start-of-message marker,
 * but I prefer keeping the code style consistent across these challenges
 */
export const getStartOfDistinctWindow = (str: string, windowSize: number): number => str.split('').reduce<number>(
  (acc, _, i, arr) => {
    const window = arr.slice(i, i + windowSize);

    // if we've already found the start of message, just return
    if (acc !== 0) {
      return acc;
    }

    if (new Set(window).size === windowSize) {
      return i + windowSize;
    }

    return acc;
  },
  0,
);