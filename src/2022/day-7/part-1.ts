import { fileTree, getFileSum } from './common';

const MAX_DIRECTORY_SIZE = <const> 100_000;

const sum = Object.entries(fileTree).reduce<number>(
  (acc, [path, _]) => {
    const fileSum = getFileSum(fileTree, path);

    if (!fileSum || fileSum > MAX_DIRECTORY_SIZE) {
      return acc;
    }

    return acc + fileSum;
  },
  0,
);

console.log(`Day 7 Part 1: The sum of the total sizes of directories under the size limit is ${sum}`);
