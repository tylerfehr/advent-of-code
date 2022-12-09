import { readTextFile } from '../../readfile';

export const DAY_NINE_INPUT_FILE_PATH = '../inputs/day-9-test.txt';

/**
 * Direction of motion
 */
export enum Direction {
  Up = 'U',
  Down = 'D',
  Left = 'L',
  Right = 'R',
}

/**
 * Simulated motion of steps that the rope took
 */
export const series: [Direction, number][] = readTextFile(DAY_NINE_INPUT_FILE_PATH)
  .trim()
  .split('\n')
  .map<[Direction, number]>(([direction, stepSize]) => [<Direction> direction, +stepSize]);

export type Position = [number, number];

/**
 * Rope state
 * 
 * Simulation of a grid as a 2D array is not necesary, we can just
 * keep track of their relative positions in time and compare them
 * 
 * This has the added benefit of being able to do calculations as a
 * cartesian coordinate system
 */
export interface RopeState {
  hPos: Position;
  tPos: Position;

  /**
   * Keep track of every place the tail as been at least once.
   */
  tPosLookup: Record<`${number},${number}`, true>;
}

/**
 * Map each direction to the diff in position it takes for a single step
 */
export const ONE_MOVEMENT_LOOKUP: Record<Direction, Position> = {
  [Direction.Up]: [0, 1],
  [Direction.Down]: [0, -1],
  [Direction.Left]: [-1, 0],
  [Direction.Right]: [1, 0],
};

/**
 * Get the difference of x and y positions
 */
export const getDelta = ([x1, y1]: Position, [x2, y2]: Position): Position => [x1 - x2, y2 - y1];

/**
 * Apply a step delta to a position [x1, y1]
 */
export const applyDelta = ([x1, y1]: Position, [dx, dy]: Position): Position => [x1 + dx, y1 + dy];

/**
 * Diagonal Deltas are [1, 1], [-1, 1], [-1, -1] and [1, -1],
 * so the absolute value of each x and y is just 1
 */
export const isDeltaDiagonal = ([x, y]: Position): boolean => Math.abs(x) === 1 && Math.abs(y) === 1;
