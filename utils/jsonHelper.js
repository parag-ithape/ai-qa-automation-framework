export function parseModelJson(content) {
  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function withRetry(fn, { retries = 2, label = "operation" } = {}) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        console.warn(`⚠️ ${label} failed (attempt ${attempt + 1}). Retrying...`);
      }
    }
  }

  throw lastError;
}

export function ensureArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid analyzer output: "${fieldName}" must be an array.`);
  }
}
