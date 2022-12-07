import { readTextFile } from '../../readfile';

const DAY_SEVEN_INPUT_FILE_PATH = './2022/inputs/day-7.txt';

/**
 * Raw terminal output from running commands
 */
export const terminalOutput = readTextFile(DAY_SEVEN_INPUT_FILE_PATH)
  .trim()
  .split('\n');

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
 * Get the parent of the current path
 * 
 * /first/second => /first
 */
const getParentOfPath = (path: string): string => {
  const pathArr = path.split('/');

  return pathArr.slice(0, pathArr.length - 1).join('/');
}

/**
 * The accumulator is the filetree itself.
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
        
        return { ...acc, currPath: `${acc.currPath}${arg === '/' ? '/' : arg}` };
      }
    }

    const [dirOrSize, name] = curr.split(' ')
    
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
  { fileTree: {}, currPath: '' },
);
