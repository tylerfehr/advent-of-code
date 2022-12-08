import { fileTree } from './common';

const MAX_DIRECTORY_SIZE = <const> 100_000;

const getFileSum = (path: string, files: [number, string][], directories: string[]): number => {
  const fileSum = (files ?? []).reduce<number>((acc, [size, _]) => acc + size, 0);

  const childSum = directories.reduce(
    (acc, curr) => {
      const p = `${path === '/' ? `${path}` : `${path}/`}${curr}`;

      const { files, directories } = fileTree[p];

      return acc + getFileSum(p, files ?? [], directories ?? []);
    },
    0,
  );

  return fileSum + childSum;
}

const sum = Object.entries(fileTree).reduce<number>(
  (acc, curr) => {
    const [path, { files, directories }] = curr;

    const fileSum = getFileSum(path, files ?? [], directories ?? []);

    if (!fileSum || fileSum > MAX_DIRECTORY_SIZE) {
      return acc;
    }

    return acc + fileSum;
  },
  0,
);

console.log(`The sum of the total sizes of directories under the size limit is ${sum}`);
