import {
  treeGrid,
  isVisibleFromSide,
  getColumnAbove,
  getColumnBelow,
  getRowRight,
  getRowLeft,
} from './common';

const getNumberOfVisibleTrees = (treeGrid: number[][]): number => {
  let numVisible = 0;

  // this is a simpler and more appropriate approach than reduce
  for (let i = 0; i < treeGrid.length; i += 1) {
    for (let j = 0; j < treeGrid[i].length; j += 1) {
      const currTree = treeGrid[i][j];

      const columnAbove = getColumnAbove(treeGrid, i, j);
      const columnBelow = getColumnBelow(treeGrid, i, j);
      const rowRight = getRowRight(treeGrid, i, j);
      const rowLeft = getRowLeft(treeGrid, i, j);

      if (
        isVisibleFromSide(currTree, columnAbove)
        || isVisibleFromSide(currTree, columnBelow)
        || isVisibleFromSide(currTree, rowRight)
        || isVisibleFromSide(currTree, rowLeft)
      ) {
        numVisible += 1;
      }
    }
  }

  return numVisible;
};

const totalNumVisible = getNumberOfVisibleTrees(treeGrid);

console.log(`Day 8 Part 1: The total number of visible trees is ${totalNumVisible}`);
