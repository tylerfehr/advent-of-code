import { fileTree, getFileSum, ROOT } from './common';

const MAX_DISK_SPACE = <const> 70_000_000;
const DISK_SPACE_NEEDED = <const> 30_000_000;

/**
 * The total size of the file system, starting at ROOT
 */
const totalFileSize = getFileSum(fileTree, ROOT);

/**
 * The space remaining after all our file sizes are counted
 */
const unusedSpace = MAX_DISK_SPACE - totalFileSize;

/**
 * The minimum amount of space we need to free
 */
const spaceStillNeeded = DISK_SPACE_NEEDED - unusedSpace;

const smallestDirectorySizeWeCanDelete = Object.keys(fileTree).reduce<number>(
  (acc, path) => {
    const fileSum = getFileSum(fileTree, path);

    return (fileSum < acc && fileSum > spaceStillNeeded) ? fileSum : acc;
  },
  Number.MAX_SAFE_INTEGER,
);

console.log(`Day 7 Part 2: The total size of the smallest directory we can delete is ${smallestDirectorySizeWeCanDelete}`)
