import { getStartOfDistinctWindow, transmission } from './common';

const WINDOW_SIZE = 4;

const startOfMessage = getStartOfDistinctWindow(transmission, WINDOW_SIZE);

console.log(`Day 6 Part 1: The number of characters to parse before the first start-of-packet marker is detected is ${startOfMessage}`);
