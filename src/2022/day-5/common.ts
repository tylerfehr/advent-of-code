import { readTextFile } from '../../readfile';

const DAY_FIVE_INPUT_FILE_PATH = <const> './2022/inputs/day-5.txt';

const [rawStack, rawMoveInstructions] = readTextFile(DAY_FIVE_INPUT_FILE_PATH).split('\n\n');

/**
 * Tuple of stack move instructions
 */
export type MoveInstruction = [qty: number, src: number, dest: number];

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
const initializeNStacks = (n: number): Record<number, string[]> => Object.fromEntries(
  Array(n).fill([]).map((_, i) => [i + 1, []]),
);

/**
 * The parsed stack
 */
export const stacks = rawStack.split('\n')
  // reverse so that we can push onto the stack directly in the correct order
  .reverse()
  .reduce<Record<number, string[]>>(
    (acc, curr, i) => {
      const line: string[] = curr.split(' ');

      // after reversing, the first element is the labeled stacks, 1-N
      if (i === 0) {
        const firstLine = line.reduce<string>(
          (flAcc, flCurr) => (flCurr && flCurr !== ' ') ? `${flAcc}${flCurr}` : flAcc,
          '',
        );

        return initializeNStacks(firstLine.length);
      }

      // line parsed with bracket characters and extra empty characters removed
      const { line: parsedLine } = line.reduce<{ line: string[]; emptyIdx: number }>(
        (pAcc, pCurr) => {
          // if it starts with an opening bracket, its an item to push onto the stack
          if (pCurr.startsWith('[')) {
            const [_openBracket, item, _closeBracket] = pCurr.split('');

            return { line: [...pAcc.line, item], emptyIdx: 0 };
          }

          // every four empty strings is converted into a single empty string for the purposes of the stack
          if (pCurr === '' && (pAcc.emptyIdx + 1) % 4 === 0) {
            return { line: [...pAcc.line, ''], emptyIdx: 0 };
          }
          
          return { ...pAcc, emptyIdx: pAcc.emptyIdx + 1 }
        },
        { line: [], emptyIdx: 0 },
      );

      
      // push each item onto its own stack in the correct order, ignoring empty strings
      parsedLine.forEach((l, i) => !!l ? acc[i + 1].push(l) : undefined);
      
      return acc;
    },
    {}
  );
