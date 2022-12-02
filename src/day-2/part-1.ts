import {
  tournamentRounds,
  Outcome,
  SCORE_LOOKUP,
  SAME_CHOICE_LOOKUP,
  WINNING_MATCHUPS,
} from './common';

const finalScore = tournamentRounds.reduce<number>(
  (acc, [opponentChoice, myChoice]) => {
    const scoreForChoice = SCORE_LOOKUP[myChoice];

    if (WINNING_MATCHUPS[myChoice] === opponentChoice) {
      return acc + scoreForChoice + Outcome.Win;
    }

    if (SAME_CHOICE_LOOKUP[myChoice] === opponentChoice) {
      return acc + scoreForChoice + Outcome.Draw;
    }

    return acc + scoreForChoice + Outcome.Loss;
  },
  0,
);

console.log(`Day 2 Part 1: The final score following the strategy guide is ${finalScore}`);
