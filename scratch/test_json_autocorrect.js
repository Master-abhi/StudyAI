const sanitizeJsonString = (str) => {
  let cleanStr = str.trim();
  
  // Strip markdown code block formatting
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
      } else if (char === '\n' || char === '\r') {
        // Raw newline inside a string literal! Let's check if it's a missing closing quote.
        // Look ahead to see if the next line starts with a double quote.
        let lookAheadIdx = i + 1;
        while (lookAheadIdx < cleanStr.length && /\s/.test(cleanStr[lookAheadIdx])) {
          lookAheadIdx++;
        }
        
        let isMissingQuote = false;
        if (lookAheadIdx < cleanStr.length && cleanStr[lookAheadIdx] === '"') {
          isMissingQuote = true;
        }
        
        if (isMissingQuote) {
          // Auto-insert the missing closing quote before the newline
          result += '"';
          inString = false;
          result += char; // append the newline as structural whitespace
        } else {
          // Standard multiline string: escape the newline character
          if (char === '\n') {
            result += '\\n';
          } else if (char === '\r') {
            result += '\\r';
          }
        }
      } else {
        const code = char.charCodeAt(0);
        if (code < 32) {
          if (char === '\t') {
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
        // We are starting a new string. Let's check if the previous token was a closing quote,
        // closing bracket, or closing brace, and we forgot a comma.
        let lastCharIdx = result.length - 1;
        while (lastCharIdx >= 0 && /\s/.test(result[lastCharIdx])) {
          lastCharIdx--;
        }
        
        if (lastCharIdx >= 0) {
          const lastNonWsChar = result[lastCharIdx];
          // If the last character was a closing quote, closing bracket, or closing brace,
          // we should auto-insert a comma.
          if (lastNonWsChar === '"' || lastNonWsChar === ']' || lastNonWsChar === '}') {
            result = result.slice(0, lastCharIdx + 1) + ',' + result.slice(lastCharIdx + 1);
          }
        }
        
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

// Test JSON input with missing quotes AND missing commas
const testInput = `{
  "examId": "cg_vyapam_gk",
  "questions": [
    {
      "qType": "multi_statement",
      "question": "मुरिया जनजाति के पारंपरिक युवागृह 'घोटुल' के संबंध में निम्नलिखित में से कौन-से कथन सत्य हैं?",
      "statements": [
        "घोटुल के पुरुष सदस्यों को 'चेलिक' और महिला सदस्यों को 'मोटियारीन' कहा जाता है।
        "घोटुल के सर्वोच्च पुरुष पदाधिकारी को 'सिरदार' और महिला पदाधिकारी को 'बेलोसा' कहा जाता है।
        "यह केवल एक मनोरंजन का केंद्र है और इसका आदिवासियों के सामाजिक-सांस्कृतिक शिक्षण से कोई संबंध नहीं है।"
      ]
    }
  ]
}`;

const sanitized = sanitizeJsonString(testInput);
console.log("\n--- Sanitized Output ---");
console.log(sanitized);

try {
  const parsed = JSON.parse(sanitized);
  console.log("\n--- Parsed Successfully! ---");
  console.log("Statements Array:", parsed.questions[0].statements);
} catch (e) {
  console.error("\n--- Parse Failed ---", e.message);
}
