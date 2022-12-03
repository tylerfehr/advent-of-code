import {
  rucksacks,
  LOWER_PRIORITIES,
  UPPER_PRIORITIES,
  splitRucksackInTwo,
} from "./common";

const summedPriorities = rucksacks.reduce<number>(
  (acc, curr) => {
    const [firstHalf, secondHalf] = splitRucksackInTwo(curr);

    // create a hash map in linear time to test for duplicates
    const duplicateLookup = firstHalf.split('').reduce<Record<string, true>>(
      (duplicateAcc, curr: string) => {
        if (!duplicateAcc[curr]) {
          duplicateAcc[curr] = true;
        }

        return duplicateAcc;
      },
      {},
    );

    // traditional for loop to exit early from outer reduce
    for (const item of secondHalf) {
      if (duplicateLookup[item]) {
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

console.log(`Day 3 Part 1: The sum of the priorities of the duplicate item types is ${summedPriorities}`);
