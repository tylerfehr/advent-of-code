import { readTextFile } from '../../readfile';

const DAY_SEVEN_INPUT_FILE_PATH = './2022/inputs/day-7.txt';

/**
 * Raw terminal output from running commands
 */
export const terminalOutput = readTextFile(DAY_SEVEN_INPUT_FILE_PATH)
  .trim()
  .split('\n')
  // skip over initial `cd /`; we'll assume it's there
  .slice(1);

/**
 * User commands
 */
export enum Command {
  ls = 'ls',
  cd = 'cd',
}

type TreeNode = { files: [number, string][]; directories: string[] };

/**
 * Flat file tree structure, mapped to the paths of its objs (files/directories)
 */
export type FileTree = Record<string, TreeNode>;

/**
 * Root path
 */
export const ROOT = '/';

/**
 * Get the parent of the current path
 * 
 * /first/second => /first
 */
export const getParentOfPath = (path: string): string => {
  const pathArr = path.split('/');

  return pathArr.slice(0, pathArr.length - 1).join('/');
}

/**
 * The accumulator is the filetree itself
 */
export const { fileTree } = terminalOutput.reduce<{ fileTree: FileTree; currPath: string }>(
  (acc, curr) => {
    if (curr.startsWith('$')) {
      const [_$, cmd, arg] = curr.split(' ');
      
      if (cmd === Command.ls) {
        return acc;
      }
      
      if (cmd === Command.cd) {
        if (arg === '..') {
          return { ...acc, currPath: getParentOfPath(acc.currPath) };
        }

        return {
          ...acc,
          currPath: acc.currPath === ROOT ? `${acc.currPath}${arg}` : `${acc.currPath}/${arg}`,
        };
      }
    }

    const [dirOrSize, name] = curr.split(' ');

    // if the files and directories at the current path don't exist, we need to initialize them
    if (!acc.fileTree[acc.currPath]) {
      acc.fileTree[acc.currPath] = { directories: [], files: [] };
    }
    
    if (dirOrSize === 'dir') {
      acc.fileTree[acc.currPath].directories.push(name);
    }
    else {
      acc.fileTree[acc.currPath].files.push([+dirOrSize, name]);
    }

    return acc;
  },
  { fileTree: {}, currPath: ROOT },
);

/**
 * Get sum of file sizes for a path and its children
 */
 export const getFileSum = (fileTree: FileTree, path: string): number => {
  const { files, directories } = fileTree[path];

  const fileSum = files.reduce<number>((acc, [size, _]) => acc + size, 0);

  const childSum = directories.reduce<number>(
    (acc, curr) => acc + getFileSum(fileTree, `${path === '/' ? `${path}` : `${path}/`}${curr}`),
    0,
  );

  return fileSum + childSum;
};
