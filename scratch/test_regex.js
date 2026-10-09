function formatNotesContent(content) {
  if (!content || typeof content !== 'string') return content;
  let str = content;
  str = str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Format bullet points (•, ●) so each is on its own line as markdown '-'
  str = str.replace(/([^\n])\s*[•●]\s*/g, '$1\n\n- ');
  str = str.replace(/^[ \t]*[•●]\s*/gm, '- ');

  // If a numbered list item (1., 2.) is stuck on the same line after punctuation, insert double newline
  str = str.replace(/([^\n\r#])\s*([।!?\.])\s*(\d+\.)\s+(\*\*|[A-Za-z\u0900-\u097F])/g, '$1$2\n\n$3 $4');

  // Ensure numbered list items have double newlines before them so markdown parses them properly as <ol>
  str = str.replace(/([^\n])\n[ \t]*(\d+\.)\s+/g, '$1\n\n$2 ');

  // Format Devanagari / English subheadings like (क), (ख) on their own line without #### to have ####
  str = str.replace(/(?<!#.*)(?:^|\n)[ \t]*\(([क-हa-z0-9])\)\s*(\*\*|[A-Za-z\u0900-\u097F])/gi, '\n\n#### ($1) $2');

  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

let test1 = "1. **तीर्थंकर शब्द का अर्थ**: तीर्थंकर कहा जाता है。\n2. **जिन (Jina)**: इंद्रियों पर विजय।\n3. **श्रमण**: तप और संयम।";
console.log('TEST 1 (Normal lines):');
console.log(formatNotesContent(test1));

let test2 = 'परिचय है।1. **पहला बिंदु**: व्याख्या।2. **दूसरा बिंदु**: व्याख्या।';
console.log('\nTEST 2 (Glued lines):');
console.log(formatNotesContent(test2));

let test3 = '(क) उप-शीर्षक\n1. **पहला बिंदु**: व्याख्या।\n- बुलेट 1\n- बुलेट 2\n2. **दूसरा बिंदु**: व्याख्या।';
console.log('\nTEST 3 (Mixed):');
console.log(formatNotesContent(test3));
