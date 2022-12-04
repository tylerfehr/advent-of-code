import { isFullyOverlapping, sectionAssignments } from "./common";

const numOverlappingPairs = sectionAssignments
  .reduce<number>((acc, [p1, p2]) => acc + (isFullyOverlapping(p1, p2) ? 1 : 0), 0);

console.log(`Day 4 Part 1: The number of assigments with one pair being completely overlapped is ${numOverlappingPairs}`);
