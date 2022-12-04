import { sectionAssignments, type Pair } from "./common";

const isOverlapping = (
  [o1, c1]: Pair, [o2, c2]: Pair,
): boolean => (o1 >= o2 && c1 <= c2) || (o2 >= o1 && c2 <= c1);

const numOverlappingPairs = sectionAssignments.reduce<number>((acc, [p1, p2]) => acc + (isOverlapping(p1, p2) ? 1 : 0), 0);

console.log(`The number of assigments with one pair being completely overlapped is ${numOverlappingPairs}`);
