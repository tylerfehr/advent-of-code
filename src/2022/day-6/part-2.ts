import { getStartOfDistinctWindow, transmission } from './common';

const WINDOW_SIZE = 14;

const startOfMessage = getStartOfDistinctWindow(transmission, WINDOW_SIZE);

console.log(`Day 6 Part 2: After being told to find the larger start-of-message marker, the number of characters to parse is ${startOfMessage}`);
