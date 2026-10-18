import remarkParse from '../mcq-practice/node_modules/remark-parse/index.js';
import remarkMath from '../mcq-practice/node_modules/remark-math/index.js';
import { unified } from '../mcq-practice/node_modules/unified/index.js';
import remarkRehype from '../mcq-practice/node_modules/remark-rehype/index.js';
import rehypeRaw from '../mcq-practice/node_modules/rehype-raw/index.js';
import katex from '../mcq-practice/node_modules/katex/dist/katex.mjs';

const inputs = [
  'मान $1.44\\;M_\\odot$ (सूर्य',
  'खगोलीय दूरी $1\\;\\text{पारसेक} = 3.26\\;\\text{प्रकाश वर्ष} = 3.0857 \\times 10^{16}\\;\\text{मीटर}$',
  'प्रोटॉन: $$4\\;^1_1\\text{H} \\rightarrow \\;^4_2\\text{He} + 2\\;^0_{+1}e + 2\\nu + 26.7\\;\\text{MeV}$$',
  'प्रोटॉन लिस्ट:\n- पॉइंट:\n    $$4\\;^1_1\\text{H} \\rightarrow \\;^4_2\\text{He} + 2\\;^0_{+1}e + 2\\nu + 26.7\\;\\text{MeV}$$'
];

for (const input of inputs) {
  console.log('--- INPUT ---');
  console.log(input);
  const ast = unified().use(remarkParse).use(remarkMath).parse(input);
  console.log('AST:', JSON.stringify(ast.children[0].children, null, 2));
}

console.log('\n--- KATEX DIRECT TESTS ---');
for (const expr of [
  '1.44\\;M_\\odot',
  '1\\;\\text{पारसेक} = 3.26\\;\\text{प्रकाश वर्ष} = 3.0857 \\times 10^{16}\\;\\text{मीटर}',
  '4\\;^1_1\\text{H} \\rightarrow \\;^4_2\\text{He} + 2\\;^0_{+1}e + 2\\nu + 26.7\\;\\text{MeV}'
]) {
  try {
    katex.renderToString(expr, { throwOnError: true });
    console.log('SUCCESS:', expr);
  } catch (err) {
    console.log('FAILED:', expr, '->', err.message);
  }
}
