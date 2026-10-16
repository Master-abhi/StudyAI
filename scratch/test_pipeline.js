const fs = require('fs');

async function run() {
  const { unified } = await import('unified');
  const remarkParse = (await import('remark-parse')).default;
  const remarkMath = (await import('remark-math')).default;
  const remark2rehype = (await import('remark-rehype')).default;
  const rehypeKatex = (await import('rehype-katex')).default;
  const rehypeStringify = (await import('rehype-stringify')).default;

  const input = `मोमबत्ती की ज्वाला के 3 स्पष्ट क्षेत्र होते हैं:

$$\\begin{matrix}
\\mathbf{1.\\;बाह्य\\;अदीप्त\\;क्षेत्र\\;(नीला)} & : & \\mathbf{सबसे\\;गर्म\\;क्षेत्र\\;(\\approx 1400^\\circ C)} & [\\text{पूर्ण दहन}] \\\\
\\mathbf{2.\\;मध्य\\;दीप्त\\;क्षेत्र\\;(पीला)} & : & \\text{मध्यम गर्म } (\\approx 1000^\\circ C) & [\\text{अपूर्ण दहन - कालिख}] \\\\
\\mathbf{3.\\;आंतरिक\\;अदीप्त\\;क्षेत्र\\;(काला)} & : & \\text{सबसे ठंडा क्षेत्र } (\\approx 600^\\circ C) & [\\text{अदग्ध मोमवाष्प}]
\\end{matrix}$$

### 1. आंतरिक क्षेत्र (Innermost Dark Zone - काला क्षेत्र)
* **स्थिति:** बत्ती के ठीक चारों ओर का सबसे भीतरी भाग।`;

  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remark2rehype)
      .use(rehypeKatex)
      .use(rehypeStringify)
      .process(input);
    console.log('Result HTML:');
    console.log(String(file));
  } catch (err) {
    console.error('Pipeline error:', err);
  }
}

run();
