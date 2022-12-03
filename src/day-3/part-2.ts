import {
  LOWER_PRIORITIES,
  UPPER_PRIORITIES,
  rucksacks,
} from './common';

/**
 * Split rucksack into groups of three with local duplicates removed via a set
 */
const groupsOfThree = rucksacks.reduce<[r1: string[], r2: string[], r3: string[]][]>(
  (acc, curr: string, i, rucksackArr) => (i % 3 === 0)
    ?
    [
      ...acc,
      [
        Array.from(new Set(curr.split(''))),
        Array.from(new Set(rucksackArr[i + 1].split(''))),
        Array.from(new Set(rucksackArr[i + 2].split(''))),
      ]
    ]
    : acc,
  [],
);

const summedPriorities = groupsOfThree.reduce(
  (acc, [r1, r2, r3]) => {
    const duplicateLookup = r1.reduce<Record<string, number>>(
      (duplicateAcc, curr) => {
        duplicateAcc[curr] = 1;

        return duplicateAcc;
      },
      {},
    );

    for (const item of r2.values()) {
      if (duplicateLookup[item]) {
        duplicateLookup[item] += 1;
      }
    }

    for (const item of r3.values()) {
      // if its a duplicate and its the same as the one we've seen twice before, it's the elf's badge
      if (duplicateLookup[item] && duplicateLookup[item] === 2) {

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

console.log(`The sum of priorities for the duplicate items in each three-elf group is ${summedPriorities}`);
