import {
  treeGrid,
  getColumnAbove,
  getColumnBelow,
  getRowLeft,
  getRowRight,
} from './common';

/**
 * Continuously append to array while cb returns true
 */
 export const takeWhile = (arr: number[], cb: (v: number) => boolean): number[] => {
  let complete = false;

  return arr.reduce<number[]>(
    (acc, curr) => {
      const res = cb(curr);

      if (!res) {
        complete = true;
      }

      return res && !complete ? [...acc, curr] : acc;
    },
    [],
  );
}

// TODO: wip
const getHighestScenicScore = (treeGrid: number[][]): number => {
  const scenicScores: number[] = []; 

  for (let i = 0; i < treeGrid.length; i += 1) {
    for (let j = 0; j < treeGrid[i].length; j += 1) {
      const tree = treeGrid[i][j];

      const columnAbove = getColumnAbove(treeGrid, i, j);
      const columnBelow = getColumnBelow(treeGrid, i, j);
      const rowRight = getRowRight(treeGrid, i, j);
      const rowLeft = getRowLeft(treeGrid, i, j);

      // TODO: if there are two in a row with the same height
      // that block the viewing distance, stop on the first one
      const cb = (v: number) => v <= tree;

      const surroundingShortTrees = [
        takeWhile(columnAbove, cb),
        takeWhile(columnBelow, cb),
        takeWhile(rowRight, cb),
        takeWhile(rowLeft, cb),
      ].map((t) => t.length);

      const scenicScoreForTree = surroundingShortTrees
        .flat()
        .reduce((acc, curr) => acc * curr, 1);

      scenicScores.push(scenicScoreForTree);
    }
  }

  console.log(scenicScores);

  return Math.max(...scenicScores);
};

const highestScenicScore = getHighestScenicScore(treeGrid);

console.log(`Day 8 Part 2: The maximum scenic score possible for the forest is ${highestScenicScore}`);
