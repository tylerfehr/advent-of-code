import {
  stacks,
  moveInstructions,
  type MoveInstruction,
} from './common';

/**
 * Move items with the CrateMover 9000, one item at a time
 */
const moveItem = (
  stacks: Record<number, string[]>,
  [qty, src, dest]: MoveInstruction,
) => {
  for (let i = 0; i < qty; i += 1) {
    const popped = stacks[src].pop();

    // if the last popped item was falsy, we won't push anything
    if (!popped) {
      continue;
    }

    stacks[dest].push(popped);
  }

  // mutate (blah) and return the stacks
  return stacks;
};

// execute each move instruction
moveInstructions.forEach((m) => moveItem(stacks, m));

// get the character on each stack top
const topItemForEachStack = Object.values(stacks).reduce((acc, curr) => `${acc}${curr.pop()}`, '');

console.log(`The top item on each stack after every move instruction is executed is ${topItemForEachStack}`)