const sanitizeJsonString = (str) => {
  let inString = false;
  let escaped = false;
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if (inString) {
      if (escaped) {
        result += char;
        escaped = false;
      } else if (char === '\\') {
        result += char;
        escaped = true;
      } else if (char === '"') {
        result += char;
        inString = false;
      } else {
        const code = char.charCodeAt(0);
        if (code < 32) {
          if (char === '\n') {
            result += '\\n';
          } else if (char === '\r') {
            result += '\\r';
          } else if (char === '\t') {
            result += '\\t';
          } else if (char === '\b') {
            result += '\\b';
          } else if (char === '\f') {
            result += '\\f';
          } else {
            const hex = code.toString(16).padStart(4, '0');
            result += '\\u' + hex;
          }
        } else {
          result += char;
        }
      }
    } else {
      if (char === '"') {
        inString = true;
      }
      
      // Auto-remove trailing commas
      if (char === ',') {
        let nextIdx = i + 1;
        while (nextIdx < str.length && /\s/.test(str[nextIdx])) {
          nextIdx++;
        }
        if (nextIdx < str.length && (str[nextIdx] === '}' || str[nextIdx] === ']')) {
          // Trailing comma! Skip appending it
          continue;
        }
      }
      
      result += char;
    }
  }

  return result
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
    .replace(/\u00A0/g, ' ') // Convert non-breaking spaces to standard spaces
    .trim();
};

const getJsonErrorContext = (jsonText, errMessage) => {
  const match = errMessage.match(/at position (\d+)/);
  if (!match) return '';
  
  const pos = parseInt(match[1], 10);
  const start = Math.max(0, pos - 30);
  const end = Math.min(jsonText.length, pos + 30);
  const context = jsonText.slice(start, end);
  
  // Create a visual indicator under the context
  const prefix = context.slice(0, pos - start);
  // We want to account for any newlines in the context prefix when drawing the pointer
  const pointer = ' '.repeat(prefix.length) + '^';
  return `\n\nContext around error:\n>>> ${context} <<<\n${' '.repeat(4)}${pointer}`;
};

// Test 1: trailing commas
const testTrailingCommas = `{\n  "options": [\n    "Option 1",\n    "Option 2",\n  ],\n}`;
console.log("--- Test Trailing Commas ---");
const sanitized1 = sanitizeJsonString(testTrailingCommas);
console.log("Sanitized:");
console.log(sanitized1);
try {
  JSON.parse(sanitized1);
  console.log("Successfully parsed JSON with trailing commas!");
} catch (e) {
  console.error("Failed to parse:", e.message);
}

// Test 2: Invalid JSON (missing comma between array elements)
const testMissingComma = `{\n  "options": [\n    "Option 1"\n    "Option 2"\n  ]\n}`;
console.log("\n--- Test Missing Comma ---");
const sanitized2 = sanitizeJsonString(testMissingComma);
try {
  JSON.parse(sanitized2);
} catch (e) {
  console.log("Failed to parse (expected):", e.message);
  console.log(getJsonErrorContext(sanitized2, e.message));
}
