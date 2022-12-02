import { sums } from './common';

// how many top N values to get
const TOP_RANGE = 3;

const topThreeSum = sums
  .sort((a, b) => b - a)
  .slice(0, TOP_RANGE)
  .reduce<number>((acc, curr) => acc + curr, 0);

console.log(`Sum of the top three elves with the most calories: ${topThreeSum}`);
