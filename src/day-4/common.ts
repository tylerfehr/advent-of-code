import { readTextFile } from "../readfile";

export const DAY_FOUR_INPUT_FILE_PATH = <const> './inputs/day-4/part-1.txt';

/**
 * Section assignments parsed into number tuples
 */
export const sectionAssignments: [Pair, Pair][] = readTextFile(DAY_FOUR_INPUT_FILE_PATH)
  .split('\n')
  .map<[pairOne: Pair, pairTwo: Pair]>((row) => {
      const [assignmentPairOne, assignmentPairTwo] = row.split(',');

      const pairOne = <Pair> assignmentPairOne.split('-').map((p) => +p);
      const pairTwo = <Pair> assignmentPairTwo.split('-').map((p) => +p);

      return [pairOne, pairTwo]
    },
  );

/**
 * Test if one pair is completely overlapped by another
 */
export const isFullyOverlapping = ([o1, c1]: Pair, [o2, c2]: Pair): boolean => (o1 >= o2 && c1 <= c2) || (o2 >= o1 && c2 <= c1);

/**
 * A number pair
 */
export type Pair = [number, number];
