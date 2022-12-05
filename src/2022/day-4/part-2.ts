import { isFullyOverlapping, sectionAssignments, type Pair } from "./common";

const isPartiallyOverlapping = ([o1, c1]: Pair, [o2, c2]: Pair): boolean => (c1 >= o2 && c1 <= c2)
  || (c2 >= o1 && c2 <= c1)
  || isFullyOverlapping([o1, c1], [o2, c2]);

const numOverlappingPairs = sectionAssignments
  .reduce<number>((acc, [p1, p2]) => acc + (isPartiallyOverlapping(p1, p2) ? 1 : 0), 0);

console.log(`Day 4 Part 2: The number of assigments with partial overlapping is ${numOverlappingPairs}`);
