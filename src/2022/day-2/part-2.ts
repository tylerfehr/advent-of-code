import {
  tournamentRounds,
  Outcome,
  MyResponse,
  OpponentResponse,
  SCORE_LOOKUP,
} from './common';

/**
 * My response encoded to the secret desired outcome
 */
const ENCODED_OUTCOME_TO_MY_GUESS = <const> {
  [MyResponse.Rock]: Outcome.Loss,
  [MyResponse.Paper]: Outcome.Draw,
  [MyResponse.Scissors]: Outcome.Win,
}

/**
 * Lookup mapping opponent response to the response I would give for each outcome
 */
const ENCODED_OUTCOMES = <const> {
  [OpponentResponse.Rock]: {
    [Outcome.Win]: MyResponse.Paper,
    [Outcome.Draw]: MyResponse.Rock,
    [Outcome.Loss]: MyResponse.Scissors,
  },
  [OpponentResponse.Paper]: {
    [Outcome.Win]: MyResponse.Scissors,
    [Outcome.Draw]: MyResponse.Paper,
    [Outcome.Loss]: MyResponse.Rock,
  },
  [OpponentResponse.Scissors]: {
    [Outcome.Win]: MyResponse.Rock,
    [Outcome.Draw]: MyResponse.Scissors,
    [Outcome.Loss]: MyResponse.Paper,
  },
};

const finalScore = tournamentRounds.reduce<number>(
  (acc, [opponentChoice, myChoice]) => {
    const myDesiredOutcome = ENCODED_OUTCOME_TO_MY_GUESS[myChoice];
    const myGuessForOutcome = ENCODED_OUTCOMES[opponentChoice][myDesiredOutcome];

    return acc + myDesiredOutcome + SCORE_LOOKUP[myGuessForOutcome];
  },
  0,
);

console.log(`Day 2 Part 2: The final score following the adjusted strategy guide is ${finalScore}`);
