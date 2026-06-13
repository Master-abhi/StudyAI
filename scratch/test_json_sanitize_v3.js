const sanitizeJsonString = (str) => {
  let cleanStr = str.trim();
  
  // Strip markdown code blocks
  if (cleanStr.startsWith('```')) {
    cleanStr = cleanStr.replace(/^```(?:json)?/i, '').trim();
    cleanStr = cleanStr.replace(/```$/, '').trim();
  }

  let inString = false;
  let escaped = false;
  let result = '';
  
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i];
    
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
        while (nextIdx < cleanStr.length && /\s/.test(cleanStr[nextIdx])) {
          nextIdx++;
        }
        if (nextIdx < cleanStr.length && (cleanStr[nextIdx] === '}' || cleanStr[nextIdx] === ']')) {
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

const validateJsonStructure = (sanitized) => {
  if (!sanitized.startsWith('{') && !sanitized.startsWith('[')) {
    return "The input does not appear to be a valid JSON structure (it must start with '{' or '['). Please verify your pasted text.";
  }
  return null;
};

// Test 1: Markdown code block wrapped JSON
const test1 = `\`\`\`json
{
  "key": "value"
}
\`\`\``;
console.log("--- Test 1 (Markdown code block) ---");
const sanitized1 = sanitizeJsonString(test1);
console.log("Sanitized:", JSON.stringify(sanitized1));
const err1 = validateJsonStructure(sanitized1);
console.log("Validation error:", err1);
console.log("Parsed:", JSON.parse(sanitized1));

// Test 2: Error log pasted (like installHook.js...)
const test2 = `installHook.js:1 SyntaxError: Expected ',' or ']' after array element in JSON`;
console.log("\n--- Test 2 (Error log pasted) ---");
const sanitized2 = sanitizeJsonString(test2);
console.log("Sanitized:", JSON.stringify(sanitized2));
const err2 = validateJsonStructure(sanitized2);
console.log("Validation error (should catch it):", err2);
