// This file contains utility functions for working with PDF files.

import fs from "fs";
import pdf from "pdf-parse";

/**
 * Reads a PDF file and extracts its text content.
 * @param {string} filePath - The path to the PDF file.
 * @returns {Promise<string[]>} - A promise that resolves to an array of lines from the PDF.
 */
export const getLinesFromPDF = async (filePath: string): Promise<string[]> => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text.split("\n");
};
