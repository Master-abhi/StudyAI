function formatNotesContent(content) {
  if (typeof content !== 'string') return content || '';
  let str = content;

  // First convert <li>Title: text</li> or <li><b>Title:</b> text</li> into markdown bullet
  if (/<[a-z][\s\S]*>/i.test(str)) {
    str = str.replace(/<li[^>]*>\s*<strong>([^<]+)<\/strong>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>\s*<b>([^<]+)<\/b>\s*:?\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>\s*([^:<]+?)\s*:\s*([\s\S]*?)<\/li>/gi, '\n- **$1:** $2');
    str = str.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');

    // Replace bold & italic tags
    str = str.replace(/<\/?(b|strong)[^>]*>/gi, '**');
    str = str.replace(/<\/?(i|em)[^>]*>/gi, '*');

    // Line breaks and paragraphs
    str = str.replace(/<br\s*\/?>/gi, '\n');
    str = str.replace(/<p[^>]*>/gi, '\n\n');
    str = str.replace(/<\/p>/gi, '\n');

    // Remove list wrappers
    str = str.replace(/<\/?(ul|ol|span|div)[^>]*>/gi, '\n');

    // Strip any other lingering HTML tags
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

  // Format Devanagari / English subheadings like (क), (ख), (a), (b) into markdown headers if on same or new lines
  str = str.replace(/([^\n])\s*\(([क-हa-z0-9])\)\s*(\*\*|[A-Za-z\u0900-\u097F])/gi, '$1\n\n#### ($2) $3');
  str = str.replace(/^([ \t]*)\(([क-हa-z0-9])\)\s*(\*\*|[A-Za-z\u0900-\u097F])/gmi, '#### ($2) $3');

  // Format bullet points (•, ●) so each is on its own line as markdown '-'
  str = str.replace(/([^\n])\s*[•●]\s*/g, '$1\n\n- ');
  str = str.replace(/^[ \t]*[•●]\s*/gm, '- ');

  // Format numbered lists (1., 2.) so each has a clean line break before it
  str = str.replace(/([^\n])\s*(\d+\.)\s+(\*\*|[A-Za-z\u0900-\u097F])/g, '$1\n\n$2 $3');

  // Normalize excessive newlines
  str = str.replace(/\n{3,}/g, '\n\n').trim();
  return str;
}

// Helper to normalize notes object and unpack any sanitized Firestore table rows

module.exports = { formatNotesContent };