import { fileTree, getFileSum } from './common';

const MAX_DIRECTORY_SIZE = <const> 100_000;

const sum = Object.keys(fileTree).reduce<number>(
  (acc, path) => {
    const fileSum = getFileSum(fileTree, path) ?? 0;

    return fileSum <= MAX_DIRECTORY_SIZE ? acc + fileSum : acc;
  },
  0,
);

console.log(`Day 7 Part 1: The sum of the total sizes of directories under the size limit is ${sum}`);
