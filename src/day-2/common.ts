import { readTextFile } from '../readfile';

export const DAY_TWO_INPUT_FILE_PATH = <const> './inputs/day-2/part-1.txt';

export const tournamentRounds = <[OpponentResponse, MyResponse][]> readTextFile(DAY_TWO_INPUT_FILE_PATH)
  .trim()
  .split('\n')
  .map((round) => round.split(' '));

/**
 * Opponent's (elf's) choice for RPS
 */
export enum OpponentResponse {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C'
}

/**
 * Player's choice for RPS
 */
export enum MyResponse {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

/**
 * Maps my response to its score
 */
export const SCORE_LOOKUP = <const> {
  [MyResponse.Rock]: 1,
  [MyResponse.Paper]: 2,
  [MyResponse.Scissors]: 3,
}

/**
 * Outcome for a round of RPS
 */
export enum Outcome {
  Loss = 0,
  Draw = 3,
  Win = 6,
}

/**
 * Maps my choices to the same value for the opponent's choices
 */
export const SAME_CHOICE_LOOKUP = <const> {
  [MyResponse.Rock]: OpponentResponse.Rock,
  [MyResponse.Paper]: OpponentResponse.Paper,
  [MyResponse.Scissors]: OpponentResponse.Scissors,
}

/**
 * Maps my choices to the value they win over
 */
export const WINNING_MATCHUPS = <const> {
  [MyResponse.Rock]: OpponentResponse.Scissors,
  [MyResponse.Paper]: OpponentResponse.Rock,
  [MyResponse.Scissors]: OpponentResponse.Paper,
}
