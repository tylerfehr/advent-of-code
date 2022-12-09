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
 * Character representing the head
 */
export const HEAD = <const> 'H';

/**
 * Character representing the tail
 */
export const TAIL = <const> 'T';

/**
 * Simulated motion of steps that the rope took
 */
export const series: [Direction, number][] = readTextFile(DAY_NINE_INPUT_FILE_PATH)
  .trim()
  .split('\n')
  .map<[Direction, number]>(([direction, stepSize]) => [<Direction> direction, +stepSize]);

type Position = [number, number];

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
 * Get the difference of x and y positions
 */
export const getDiff = ([x1, y1]: Position, [x2, y2]: Position): Position => [x1 - x2, y2 - y1];

/**
 * Simulate the rope as it executes each step in the series
 */
export const simulateRope = (series: [Direction, number][]) => {
  series.reduce<RopeState>(
    (acc, curr) => {
      // do a step
      // check where T is in relation to H
        // if the T and H aren't touching
          // if the H is two steps U, D, L, or R from the T, move it in that direction
          // if the H isn't in the same row or column as the T, move the H diagonally in the T's direction
        // if they are touching, no update to state
      return acc;
    },
    { hPos: [0, 0], tPos: [0, 0], tPosLookup: {} },
  );
};
