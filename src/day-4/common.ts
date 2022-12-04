import { readTextFile } from "../readfile";

export const DAY_FOUR_INPUT_FILE_PATH = <const> './inputs/day-4/part-1.txt';

export const sectionAssignments: [Pair, Pair][] = readTextFile(DAY_FOUR_INPUT_FILE_PATH)
  .split('\n')
  .map<[pairOne: Pair, pairTwo: Pair]>((row) => {
      const [assignmentPairOne, assignmentPairTwo] = row.split(',');

      const pairOne = <Pair> assignmentPairOne.split('-').map((p) => +p);
      const pairTwo = <Pair> assignmentPairTwo.split('-').map((p) => +p);

      return [pairOne, pairTwo]
    },
  );

export type Pair = [number, number];