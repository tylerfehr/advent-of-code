import { stacks, moveInstructions, type MoveInstruction } from './common';

/**
 * Move items with the CrateMover 9001 which has the ability to move multiple crates at once
 */
const moveItem = (
  stacks: Record<number, string[]>,
  [qty, src, dest]: MoveInstruction,
) => {
  const partToMove = stacks[src].slice(stacks[src].length - qty, stacks[src].length);

  stacks[src] = stacks[src].slice(0, stacks[src].length - qty);
  stacks[dest].push(...partToMove)
};

// execute each move instruction
moveInstructions.forEach((m) => moveItem(stacks, m));

// get the character on each stack top
const topItemForEachStack = Object.values(stacks).reduce((acc, curr) => `${acc}${curr.pop()}`, '');

console.log(`After the new arrangement procedure, the top crate on each stack is ${topItemForEachStack}`);
