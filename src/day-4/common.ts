import { readTextFile } from "../readfile";

export const DAY_FOUR_INPUT_FILE_PATH = <const> './inputs/day-4/part-1.txt';

export const getSectionAssignments = readTextFile(DAY_FOUR_INPUT_FILE_PATH)
  .split('\n')
  .map<[pairOne: [number, number], PairTwo: [number, number]]>((row) => {
      const [assignmentPairOne, assignmentPairTwo] = row.split(',');

      const pairOneArr = <[number, number]> assignmentPairOne.split('-').map((p) => +p);
      const pairTwoArr = <[number, number]> assignmentPairTwo.split('-').map((p) => +p);

      return [pairOneArr, pairTwoArr]
    },
  );