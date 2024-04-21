import * as fs from "fs";
import path from "path";

export const readFile = async (filePath: string) => {
  // Get the absolute path to the root directory of the project
  const rootDir = path.resolve(__dirname, "../../");

  const htmlFilePath = path.join(rootDir, filePath);

  const file = fs.readFileSync(htmlFilePath);

  return file;
};
