import { readTextFile } from '../../readfile';

const DAY_EIGHT_INPUT_FILE_PATH = './2022/inputs/day-8-test.txt';

/**
 * The two dimensional grid of trees, parsed into arrays
 */
export const treeGrid: number[][] = readTextFile(DAY_EIGHT_INPUT_FILE_PATH)
  .trim()
  .split('\n')
  .map<number[]>((treeRow) => treeRow.split('').map<number>((t) => +t));

/**
 * Test if row or column subarray values are all shorter than the input tree
 */
export const isVisibleFromSide = (tree: number, treesToSide: number[]): boolean => {
  // if one of the subarrays is empty, that means we're
  // at an edge piece, so the tree is visible
  if (!treesToSide?.length) {
    return true;
  }

  return treesToSide.every((t) => t < tree);
};

/**
 * Get column above a starting point as a subarray
 */
export const getColumnAbove = (treeGrid: number[][], i: number, j: number): number[] => {
  const treeArr: number[] = [];

  for (let start = i - 1; start >= 0; start -= 1) {
    treeArr.push(treeGrid[start][j]);
  }

  return treeArr;
}

/**
 * Get column below a starting point as a subarray
 */
export const getColumnBelow = (treeGrid: number[][], i: number, j: number): number[] => {
  const treeArr: number[] = [];

  for (let start = i + 1; start < treeGrid.length; start += 1) {
    treeArr.push(treeGrid[start][j]);
  }

  return treeArr;
}

/**
 * Get row right of starting point as a subarray
 */
 export const getRowRight = (treeGrid: number[][], i: number, j: number): number[] => {
  const treeArr: number[] = [];

  for (let start = j + 1; start < treeGrid[i].length; start += 1) {
    treeArr.push(treeGrid[i][start]);
  }

  return treeArr;
}

/**
 * Get row left of starting point as a subarray
 */
 export const getRowLeft = (treeGrid: number[][], i: number, j: number): number[] => {
  const treeArr: number[] = [];

  for (let start = j - 1; start >= 0; start -= 1) {
    treeArr.push(treeGrid[i][start]);
  }

  return treeArr;
}
