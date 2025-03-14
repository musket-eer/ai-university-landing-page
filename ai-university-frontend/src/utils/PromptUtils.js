import fs from "fs/promises"; // Async file system operations

/**
 * Reads a prompt file asynchronously.
 * @param {string} fileName - The name of the prompt file.
 * @returns {Promise<string>} - The content of the file as a string.
 */
export async function readPromptFile(fileName) {
  try {
    const filePath = `./utils/prompts/${fileName}`;
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading prompt file: ${fileName}`, error);
    throw new Error(`Failed to read ${fileName}`);
  }
}
