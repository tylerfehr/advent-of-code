import { readTextFile } from '../../readfile';

const DAY_FIVE_INPUT_FILE_PATH = <const> './2022/inputs/day-5.txt';

const [rawStack, rawMoveInstructions] = readTextFile(DAY_FIVE_INPUT_FILE_PATH).split('\n\n');

type MoveInstruction = [qty: number, src: number, dest: number];

/**
 * Stack move instructions are in the form:
 * `move ${qty} from ${src} to ${dest}`
 */
export const moveInstructions: MoveInstruction[] = rawMoveInstructions
  .trim()
  .split('\n')
  .map<MoveInstruction>((m) => {
    const [_move, qty, _from, src, _to, dest] = m.split(' ');

    return [+qty, +src, +dest];
  });

/**
  * Generate N stacks, for our accumulator's initial value
  */
const initializeNStacks = (n: number): Record<number, string[]> => {
  const initializedStacks = {};

  for (let i = 0; i < n; i += 1) {
    initializedStacks[n + 1] = [];
  }

  return initializedStacks;
};

/**
 * The parsed stack
 */
export const stacks = rawStack
  .split('\n')

  // reverse so that we can push onto the stack directly in the correct order
  .reverse()
  .reduce<Record<number, string[]>>(
    (acc, curr, i) => {
      // after reversing, the first element is the labeled stacks, 1-N
      if (i === 0) {
        const firstLine = curr.trim();

        // the number of total stacks we'll need is the last number on the first line
        const numStacks = +firstLine[firstLine.length - 1];

        return initializeNStacks(numStacks);
      }


      // TODO: parse each item, null items are blank ' '
      return acc;
    },
    {}
  );

console.log(stacks);
