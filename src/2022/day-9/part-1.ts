import {
  type RopeState,
  Direction,
  Position,
  getDelta,
  applyDelta,
  isDeltaDiagonal,
  ONE_MOVEMENT_LOOKUP,
  series,
} from './common';

/**
 * Simulate the rope as it executes each step in the series
 */
export const simulateRope = (series: [Direction, number][]) => {
  series.reduce<RopeState>(
    (acc, [direction, stepSize]) => {
      const { hPos, tPos } = acc;

      // for each movement of the current instruction
      for (let i = 0; i < stepSize; i += 1) {
        // perform step
        const newHeadPos: Position = applyDelta(hPos, ONE_MOVEMENT_LOOKUP[direction]);

        // check where T is in relation to H
        const [dx, dy]: Position = getDelta(tPos, newHeadPos);

        // if touching, only update H's new position
        if (
          isDeltaDiagonal([dx, dy])
          || Object.values(ONE_MOVEMENT_LOOKUP).some(([mx, my]) => dx === mx && dy === my)
        ) {
          return { ...acc, hPos: newHeadPos };
        }

        // else (they aren't touching)

        // if the H is two steps U, D, L, or R from T, move it in that direction
        if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
          const newTPos = getDelta(hPos,[dx / 2, dy/ 2])

          return 
        }


        
          // if the H isn't in the same row or column as T, move the H diagonally in the T's direction
      }

      return acc;
    },
    { hPos: [0, 0], tPos: [0, 0], tPosLookup: {} },
  );
};

const { tPosLookup } = simulateRope(series);

console.log(`Day 9 Part 1: The tail end of the rope has been at the coordinates at least once: ${Object.keys(tPosLookup)}`);
