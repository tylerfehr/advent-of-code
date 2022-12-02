import * as fs from 'fs';
import * as path from 'path';

/**
 * Read standard plaintext file with extension .txt
 */
export const readTextFile = (filePath: string): string => {
  return fs.readFileSync(path.join(__dirname, filePath)).toString();
}
