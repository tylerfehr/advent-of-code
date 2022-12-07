import { readTextFile } from '../../readfile';

const DAY_SEVEN_INPUT_FILE_PATH = './2022/inputs/day-7-test.txt';

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
    
    if (dirOrSize === 'dir') {
      return {
        ...acc,
        fileTree: {
          ...acc.fileTree,
          [acc.currPath]: {
            ...acc.fileTree[acc.currPath],
            directories: [...acc.fileTree[acc.currPath]?.directories ?? [], name],
          },
        },
      };
    }

    return {
      ...acc,
      fileTree: {
        ...acc.fileTree,
        [acc.currPath]: {
          ...acc.fileTree[acc.currPath],
          files: [...acc.fileTree[acc.currPath]?.files ?? [], [+dirOrSize, name]],
        },
      },
    };
  },
  { fileTree: {}, currPath: ROOT },
);
