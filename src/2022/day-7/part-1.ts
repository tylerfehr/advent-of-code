import { fileTree } from './common';

const MAX_DIRECTORY_SIZE = <const> 100_000;

const sum = Object.entries(fileTree).reduce<number>(
  (acc, curr) => {
    const [_path, { files }] = curr;

    const fileSum = (files ?? []).reduce((acc, [size, _name]) => acc + size, 0);

    if (!fileSum || fileSum >= MAX_DIRECTORY_SIZE) {
      return acc;
    }

    return acc + fileSum;
  },
  0,
);

// TODO: website is currently down so I can't verify or get the second part
console.log(`The sum of the total sizes of directories under the size limit is ${sum}`);
