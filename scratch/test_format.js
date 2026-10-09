function formatNotesContent(content) {
  if (typeof content !== 'string') return content || '';
  let str = content;

  // Convert HTML tags if present
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
    str = str.replace(/<[^>]+>/g, '');
  }

  // Decode common HTML entities
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

  // If a numbered list item is glued to text on the same line (without a newline), add newlines:
  str = str.replace(/([^\n\r#])\s*([।!?\.])\s*(\d+\.)\s+(\*\*|[A-Za-z\u0900-\u097F])/g, '$1$2\n\n$3 $4');

  // If Devanagari subheadings like (क), (ख) are glued to text or on their own line without ####, ensure heading:
  str = str.replace(/(?<!#.*)(?:^|\n)[ \t]*\(([क-हa-z0-9])\)\s*(\*\*|[A-Za-z\u0900-\u097F])/gi, '\n\n#### ($1) $2');

  // Normalize excessive newlines
  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

const input = `#### (क) "तीर्थंकर" एवं "जिन" की संकल्पना
1. **तीर्थंकर शब्द का अर्थ**: "तीर्थ" का अर्थ है संसार रूपी भवसागर को पार कराने वाला घाट या मार्ग, तथा "कर" का अर्थ है बनाने वाला। अतः संसार-सागर को पार करने वाले आध्यात्मिक पथप्रदर्शक को तीर्थंकर कहा जाता है।
2. **जिन (Jina)**: जो अपनी इंद्रियों, वासनाओं और विकारों पर पूर्ण विजय प्राप्त कर ले, उसे "जिन" कहा जाता है। जिन के अनुयायी "जैन" कहलाए।
3. **श्रमण परंपरा**: जैन धर्म सनातन वैदिक कर्मकांडों से भिन्न भारत की अत्यंत प्राचीन अनात्मवादी/संन्यास प्रधान श्रमण परंपरा का अंग है।

#### (ख) प्रथम तीर्थंकर ऋषभदेव (आदिनाथ)
1. **संस्थापक**: जैन धर्म के आदि प्रवर्तक ऋषभदेव (आदिनाथ) माने जाते हैं। इनका प्रतीक चिह्न **वृषभ (बैल)** है।
2. **वैदिक उल्लेख**: ऋग्वेद में दो जैन तीर्थंकरों का स्पष्ट उल्लेख मिलता है—प्रथम तीर्थंकर **ऋषभदेव** और 22वें तीर्थंकर **अरिष्टनेमि** (नेमिनाथ, जिन्हें भगवान कृष्ण का समकालीन माना जाता है)।
3. **भागवत पुराण में उल्लेख**: भागवत पुराण में ऋषभदेव को भगवान विष्णु के 24 अवतारों में से एक माना गया है।
4. **निर्वाण स्थल**: ऋषभदेव ने कैलाश पर्वत (अष्टापद) पर निर्वाण प्राप्त किया था।`;

const out = formatNotesContent(input);
console.log('OUTPUT:\n' + out);
