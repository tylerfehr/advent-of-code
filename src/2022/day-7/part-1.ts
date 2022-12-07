import { fileTree, getParentOfPath } from './common';

const MAX_DIRECTORY_SIZE = <const> 100_000;

// TODO: wip
const getFileSums = (path: string, files: [number, string][], directories: string[]): number => {
  const fileSum = (files ?? []).reduce((acc, [size, _]) => acc + size, 0);

  const children = directories.map((d) => fileTree[`${path}${d}`]);

  return children.map((c) => getFileSums())
}

const sum = Object.entries(fileTree).reduce<number>(
  (acc, curr) => {
    const [path, { files, directories }] = curr;



    if (!fileSum || fileSum > MAX_DIRECTORY_SIZE) {
      return acc;
    }

    return acc + fileSum;
  },
  0,
);

console.log(`The sum of the total sizes of directories under the size limit is ${sum}`);
