import fs from "fs";
import mammoth from "mammoth";

export async function getInput(sourceType) {
  switch (sourceType) {
    case "text":
      return fs.readFileSync("input.txt", "utf-8");

    case "docx":
      const result = await mammoth.extractRawText({
        path: "requirement.docx",
      });

      return result.value;

    default:
      throw new Error("Invalid input type. Use 'text' or 'docx'");
  }
}