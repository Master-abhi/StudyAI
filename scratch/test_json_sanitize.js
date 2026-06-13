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
      result += char;
    }
  }

  return result
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
    .replace(/\u00A0/g, ' ') // Convert non-breaking spaces to standard spaces
    .trim();
};

const input1 = `{
  "question": "Line 1\nLine 2 with tab\there\r\nand another line.",
  "options": [
    "A",
    "B"
  ]
}`;

// Note that the above template literal input1 actually contains real newlines inside the value if we format it like:
const input2 = `{\n  "question": "Line 1\nLine 2 with tab\there\nand another line.",\n  "options": ["A", "B"]\n}`;

console.log("Input2 string representation:");
console.log(JSON.stringify(input2));

try {
  console.log("Parsing raw input2 (should fail standard JSON parse if contains literal control characters):");
  JSON.parse(input2);
  console.log("Success? standard JSON parsed it? (Sometimes Node template strings escape them depending on syntax)");
} catch (e) {
  console.log("Standard parse failed as expected:", e.message);
}

try {
  const sanitized = sanitizeJsonString(input2);
  console.log("Sanitized output:");
  console.log(sanitized);
  const parsed = JSON.parse(sanitized);
  console.log("Parsed successfully! Question content:", parsed.question);
} catch (e) {
  console.error("Sanitization failed:", e);
}
