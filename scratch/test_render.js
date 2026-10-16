const admin = require('../server/node_modules/firebase-admin');
const serviceAccount = require('../server/service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

function formatNotesContent(content) {
  if (typeof content !== 'string') return content || '';
  let str = content;

  const tableBlocks = [];
  str = str.replace(/(?:^|\n)(\|[^\n]+\|\n\|[-:\s|]+\|\n(?:\|[^\n]+\|\n?)*)/g, (match) => {
    const cleanTable = match
      .replace(/<br\s*\/?>/gi, ' <br/> ')
      .replace(/([^\n])\s*[•●]\s*/g, '$1 <br/> • ');
    tableBlocks.push(cleanTable);
    return `\n\n__MD_TABLE_BLOCK_${tableBlocks.length - 1}__\n\n`;
  });

  if (/<[a-z][\s\S]*>/i.test(str)) {
    str = str.replace(/<li[^>]*>\s*<strong>([^<]+)<\/strong>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>\s*<b>([^<]+)<\/b>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>\s*([^:<]+?)\s*:\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');
    str = str.replace(/<\/?(b|strong)[^>]*>/gi, '**');
    str = str.replace(/<\/?(i|em)[^>]*>/gi, '*');
    str = str.replace(/<br\s*\/?>/gi, '\n');
    str = str.replace(/<p[^>]*>/gi, '\n\n');
    str = str.replace(/<\/p>/gi, '\n');
    str = str.replace(/<\/?(ul|ol|span|div)[^>]*>/gi, '\n');
    str = str.replace(/<\/?(?:p|div|span|ul|ol|li|b|i|strong|em|br|hr|h[1-6]|table|thead|tbody|tr|th|td|a|small|sub|sup)[^>]*>/gi, '');
  }

  str = str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  str = str.replace(/([^\n])\s*[•●]\s*/g, '$1\n\n- ');
  str = str.replace(/^[ \t]*[•●]\s*/gm, '- ');
  str = str.replace(/([^\n\r#])\s*([।!?\.])\s*(\d+\.)\s+(\*\*|[A-Za-z\u0900-\u097F])/g, '$1$2\n\n$3 $4');
  str = str.replace(/([^\n])\n[ \t]*(\d+\.)\s+/g, '$1\n\n$2 ');
  str = str.replace(/(?<!#.*)(?:^|\n)[ \t]*\(([क-हa-z0-9])\)\s*(\*\*|[A-Za-z\u0900-\u097F])/gi, '\n\n#### ($1) $2');

  tableBlocks.forEach((tb, i) => {
    str = str.replace(`__MD_TABLE_BLOCK_${i}__`, tb.trim());
  });

  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

const formatSuperscriptsAndMath = (text) => {
  if (!text) return '';
  let normalized = text;
  normalized = normalized.replace(/\\\[([\s\S]*?)\\\]/g, (_match, m) => `$$${m}$$`);
  normalized = normalized.replace(/\\\(([\s\S]*?)\\\)/g, (_match, m) => `$${m}$`);

  const parts = normalized.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) return part;
    let processed = part;
    processed = processed.replace(/((?:-?\d+(?:\.\d+)?\s*)?\\(?:d?frac|sqrt|times|div|pm|mp|le|ge|neq|approx|alpha|beta|theta|pi)\b(?:\{[^{}]*\}(?:\{[^{}]*\})?|[a-zA-Z0-9]*))/g, (_match, m) => `$${m.trim()}$`);
    processed = processed.replace(/<sup>(.*?)<\/sup>/gi, (_match, sup) => `^{${sup}}`);
    processed = processed.replace(/<sub>(.*?)<\/sub>/gi, (_match, sub) => `_{${sub}}`);
    processed = processed.replace(/([a-zA-Z0-9α-ωΑ-Ω\u0900-\u097F\(\)]+)\^(\{?[+-]?[a-zA-Z0-9α-ωΑ-Ω\u0900-\u097F]+\}?)/g, (_match, base, exp) => {
      const cleanExp = exp.startsWith('{') && exp.endsWith('}') ? exp.slice(1, -1) : exp;
      return `$${base}^{${cleanExp}}$`;
    });
    return processed;
  }).join('');
};

async function testRender() {
  const doc = await db.collection('topic_study_notes').doc('cgv_master_chem_9').get();
  const d = doc.data();
  const ch4 = d.studyNotes.chapters[3];
  
  const formattedContent = formatNotesContent(ch4.content);
  const finalContent = formatSuperscriptsAndMath(formattedContent);

  const idx = finalContent.indexOf('मोमबत्ती की ज्वाला के 3 स्पष्ट क्षेत्र');
  const snippet = finalContent.slice(idx, idx + 1200);
  console.log('--- SNIPPET ---');
  console.log(snippet);
}

testRender().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
