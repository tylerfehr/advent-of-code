import {
  LOWER_PRIORITIES,
  UPPER_PRIORITIES,
  rucksacks,
} from './common';

/**
 * Split rucksack into groups of three with local duplicates removed via a set
 */
const groupsOfThree = rucksacks.reduce<[r1: string[], r2: string[], r3: string[]][]>(
  (acc, _, i, rucksackArr) => (i % 3 === 0)
    ? [...acc, [rucksackArr[i], rucksackArr[i + 1], rucksackArr[i + 2]]]
    : acc,
  [],
);

const summedPriorities = groupsOfThree.reduce<number>(
  (acc, [r1, r2, r3]) => {
    const duplicateLookup = r1.reduce<Record<string, number>>(
      (duplicateAcc, curr) => {
        duplicateAcc[curr] = 1;

        return duplicateAcc;
      },
      {},
    );

    for (const item of r2) {
      if (duplicateLookup[item]) {
        duplicateLookup[item] = 2;
      }
    }

    for (const item of r3) {
      // if its a duplicate and its the same as the one we've seen twice before, it's the elf's badge
      if (duplicateLookup[item] === 2) {

        if (item === item.toLowerCase()) {
          return acc + LOWER_PRIORITIES[item];
        }

        if (item === item.toUpperCase()) {
          return acc + UPPER_PRIORITIES[item];
        }
      }
    }

    return acc;
  },
  0,
);

console.log(`Day 3 Part 2: The sum of priorities for the duplicate items in each three-elf group is ${summedPriorities}`);
