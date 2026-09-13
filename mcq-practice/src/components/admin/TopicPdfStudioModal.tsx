import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Sparkles, Printer, Download, UploadCloud, 
  Loader2, CheckCircle2, AlertCircle, FileText, ArrowLeft,
  Award, BookOpen, Bold, Italic, Table, List, 
  ListOrdered, ClipboardPaste, Eye, Code, Trash2
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Cleans pasted HTML from Word, Excel, Docs, or Web
function sanitizePastedHtml(html: string): string {
  let clean = html.replace(/<!--[\s\S]*?-->/gi, '');
  clean = clean.replace(/<style[\s\S]*?<\/style>/gi, '');
  clean = clean.replace(/<script[\s\S]*?<\/script>/gi, '');
  clean = clean.replace(/<xml[\s\S]*?<\/xml>/gi, '');
  clean = clean.replace(/<o:p>[\s\S]*?<\/o:p>/gi, '');

  const parser = new DOMParser();
  const doc = parser.parseFromString(clean, 'text/html');

  // Format tables nicely
  doc.querySelectorAll('table').forEach(tbl => {
    tbl.setAttribute('class', 'study-pasted-table w-full my-3 border-collapse border border-border/80 text-xs rounded-lg overflow-hidden');
    tbl.querySelectorAll('th').forEach(th => {
      th.setAttribute('class', 'bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60');
    });
    tbl.querySelectorAll('td').forEach(td => {
      td.setAttribute('class', 'p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30');
    });
  });

  doc.querySelectorAll('p, div, span, font').forEach(el => {
    el.removeAttribute('style');
    el.removeAttribute('class');
  });

  return doc.body.innerHTML;
}

// Safely extract string array from row (handles string[], { cells: [...] }, or object)
function getRowCells(row: any): string[] {
  if (!row) return [];
  if (Array.isArray(row)) return row;
  if (typeof row === 'object' && Array.isArray(row.cells)) return row.cells;
  if (typeof row === 'object' && row.__isRow && Array.isArray(row.cells)) return row.cells;
  return [String(row)];
}

// Convert tab-delimited text into an HTML table (for tables copied from Excel / PDF)
function tabDelimitedToHtmlTable(text: string): string {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return '';
  const rows = lines.map(line => line.split('\t').map(c => c.trim()).filter(Boolean));
  if (rows.length < 2 || rows.some(r => r.length < 2)) return '';

  let html = '<table class="study-pasted-table w-full my-3 border-collapse border border-border/80 text-xs rounded-lg overflow-hidden"><thead><tr>';
  rows[0].forEach(cell => {
    html += `<th class="bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60">${cell}</th>`;
  });
  html += '</tr></thead><tbody>';
  for (let i = 1; i < rows.length; i++) {
    html += '<tr>';
    rows[i].forEach(cell => {
      html += `<td class="p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30">${cell}</td>`;
    });
    html += '</tr>';
  }
  html += '</tbody></table><p><br/></p>';
  return html;
}

// HTML to Clean Markdown with tables preserved
function htmlToMarkdown(html: string): string {
  if (!html) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function walk(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === 'table') {
      const rows: string[][] = [];
      el.querySelectorAll('tr').forEach(tr => {
        const cells: string[] = [];
        tr.querySelectorAll('th, td').forEach(cell => {
          cells.push((cell.textContent || '').replace(/[\r\n\t|]+/g, ' ').trim());
        });
        if (cells.length > 0) rows.push(cells);
      });

      if (rows.length === 0) return '';
      const colCount = Math.max(...rows.map(r => r.length));
      if (colCount === 0) return '';

      const mdRows: string[] = [];
      const header = rows[0];
      while (header.length < colCount) header.push('');
      mdRows.push(`| ${header.join(' | ')} |`);
      mdRows.push(`| ${new Array(colCount).fill('---').join(' | ')} |`);

      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        while (r.length < colCount) r.push('');
        mdRows.push(`| ${r.join(' | ')} |`);
      }
      return '\n\n' + mdRows.join('\n') + '\n\n';
    }

    let inner = '';
    node.childNodes.forEach(child => {
      inner += walk(child);
    });

    switch (tag) {
      case 'h1': return `\n\n# ${inner.trim()}\n\n`;
      case 'h2': return `\n\n## ${inner.trim()}\n\n`;
      case 'h3': return `\n\n### ${inner.trim()}\n\n`;
      case 'h4':
      case 'h5':
      case 'h6': return `\n\n#### ${inner.trim()}\n\n`;
      case 'p': return `\n\n${inner.trim()}\n\n`;
      case 'div': return `\n${inner.trim()}\n`;
      case 'br': return '\n';
      case 'strong':
      case 'b': return ` **${inner.trim()}** `;
      case 'em':
      case 'i': return ` *${inner.trim()}* `;
      case 'u': return ` _${inner.trim()}_ `;
      case 'ul': return `\n\n${inner}\n\n`;
      case 'ol': return `\n\n${inner}\n\n`;
      case 'li': {
        const isParentOl = el.parentElement && el.parentElement.tagName.toLowerCase() === 'ol';
        if (isParentOl) {
          const index = Array.from(el.parentElement!.children).indexOf(el) + 1;
          return `\n${index}. ${inner.trim()}`;
        }
        return `\n- ${inner.trim()}`;
      }
      case 'blockquote': return `\n\n> ${inner.trim()}\n\n`;
      default: return inner;
    }
  }

  return walk(doc.body)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function markdownToHtml(md: string): string {
  if (!md) return '';
  let html = md;
  // Convert markdown tables
  html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
    const lines = match.trim().split(/\r?\n/);
    if (lines.length < 2) return match;
    const headerLine = lines[0];
    const isDivider = lines[1].includes('---');
    if (!isDivider) return match;

    const parseCells = (line: string) => 
      line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

    const headers = parseCells(headerLine);
    const dataLines = lines.slice(2);

    let tableHtml = '<table class="study-pasted-table w-full my-3 border-collapse border border-border/80 text-xs rounded-lg overflow-hidden"><thead><tr>';
    headers.forEach(h => {
      tableHtml += `<th class="bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60">${h}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';
    dataLines.forEach(dLine => {
      const cells = parseCells(dLine);
      tableHtml += '<tr>';
      cells.forEach(c => {
        tableHtml += `<td class="p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30">${c}</td>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</tbody></table>';
    return tableHtml;
  });

  html = html.replace(/^### (.*$)/gim, '<h3 class="text-sm font-black text-text mt-3 mb-1">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-base font-black text-saffron mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-lg font-black text-text mt-4 mb-2">$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-text font-medium">$1</li>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-text font-medium">$1</li>');
  html = html.replace(/\n\n+/g, '<p class="my-2"></p>');
  html = html.replace(/\n/g, '<br/>');

  return html;
}

interface TopicPdfStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
  examName: string;
  subjectName: string;
  topic: {
    id: string;
    name: string;
    nameHi?: string;
    subtopics?: string[];
  };
  currentUser: any;
  getApiUrl: (path: string) => string;
  onAttachPdf: (examId: string, topicId: string, file: File) => Promise<void>;
  onSaveNotes?: (examId: string, topicId: string, studyNotes: any) => Promise<void>;
}

export const TopicPdfStudioModal: React.FC<TopicPdfStudioModalProps> = ({
  isOpen,
  onClose,
  examId,
  examName,
  subjectName,
  topic,
  currentUser,
  getApiUrl,
  onAttachPdf,
  onSaveNotes
}) => {
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [inputMode, setInputMode] = useState<'rich' | 'raw'>('rich');
  const [topicName, setTopicName] = useState<string>(topic.name);
  const [topicNameHi, setTopicNameHi] = useState<string>(topic.nameHi || topic.name);
  const [targetExams, setTargetExams] = useState<string[]>([
    'CGPSC', 'CG Vyapam', 'Chhattisgarh Police', 'SI', 'Patwari', 'Teacher', 'Other State Exams'
  ]);
  const [rawMaterial, setRawMaterial] = useState<string>('');

  // Generation & saving states
  const [generating, setGenerating] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState<boolean>(false);
  const [attachingToTopic, setAttachingToTopic] = useState<boolean>(false);
  const [savingNotes, setSavingNotes] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Structured notes data
  const [studyData, setStudyData] = useState<any | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);
  const richEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && richEditorRef.current && rawMaterial && !richEditorRef.current.innerHTML) {
      richEditorRef.current.innerHTML = markdownToHtml(rawMaterial);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const switchToRaw = () => {
    if (richEditorRef.current) {
      const md = htmlToMarkdown(richEditorRef.current.innerHTML);
      setRawMaterial(md);
    }
    setInputMode('raw');
  };

  const switchToRich = () => {
    setInputMode('rich');
    setTimeout(() => {
      if (richEditorRef.current) {
        richEditorRef.current.innerHTML = markdownToHtml(rawMaterial);
      }
    }, 50);
  };

  const formatCommand = (cmd: string, val: string | undefined = undefined) => {
    if (richEditorRef.current) {
      richEditorRef.current.focus();
      document.execCommand(cmd, false, val);
      setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
    }
  };

  const handleInsertTable = () => {
    const tableHtml = `
      <table class="study-pasted-table w-full my-3 border-collapse border border-border/80 text-xs rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th class="bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60">शीर्षक 1</th>
            <th class="bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60">शीर्षक 2</th>
            <th class="bg-bg-s3 text-saffron font-black p-2.5 text-left border border-border/60">विवरण</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30">तथ्य 1</td>
            <td class="p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30">तथ्य 2</td>
            <td class="p-2.5 text-text border border-border/40 font-medium bg-bg-s1/30">महत्वपूर्ण बिंदु</td>
          </tr>
        </tbody>
      </table>
      <p><br/></p>
    `;
    if (inputMode === 'rich') {
      if (richEditorRef.current) {
        richEditorRef.current.focus();
        document.execCommand('insertHTML', false, tableHtml);
        setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
      }
    } else {
      setRawMaterial(prev => prev + `\n\n| शीर्षक 1 | शीर्षक 2 | विवरण |\n|---|---|---|\n| तथ्य 1 | तथ्य 2 | महत्वपूर्ण बिंदु |\n\n`);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        if (item.types.includes('text/html')) {
          const blob = await item.getType('text/html');
          const html = await blob.text();
          const cleanHtml = sanitizePastedHtml(html);
          if (richEditorRef.current) {
            richEditorRef.current.focus();
            document.execCommand('insertHTML', false, cleanHtml);
            setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
            return;
          }
        }
      }
      const text = await navigator.clipboard.readText();
      if (text) {
        if (text.includes('\t') && text.includes('\n')) {
          const tbl = tabDelimitedToHtmlTable(text);
          if (tbl && richEditorRef.current) {
            richEditorRef.current.focus();
            document.execCommand('insertHTML', false, tbl);
            setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
            return;
          }
        }
        if (richEditorRef.current) {
          richEditorRef.current.focus();
          document.execCommand('insertText', false, text);
          setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
        }
      }
    } catch {
      if (richEditorRef.current) richEditorRef.current.focus();
      setErrorMessage('Please use Ctrl+V to paste directly into the editor.');
      setTimeout(() => setErrorMessage(''), 3500);
    }
  };

  const handleClearContent = () => {
    if (window.confirm('Clear all editor content?')) {
      if (richEditorRef.current) {
        richEditorRef.current.innerHTML = '';
      }
      setRawMaterial('');
    }
  };

  const handleRichPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');

    if (html) {
      const cleanHtml = sanitizePastedHtml(html);
      document.execCommand('insertHTML', false, cleanHtml);
    } else if (text.includes('\t') && text.includes('\n')) {
      const tableHtml = tabDelimitedToHtmlTable(text);
      if (tableHtml) {
        document.execCommand('insertHTML', false, tableHtml);
      } else {
        document.execCommand('insertText', false, text);
      }
    } else {
      document.execCommand('insertText', false, text);
    }

    if (richEditorRef.current) {
      setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
    }
  };

  const handleRichInput = () => {
    if (richEditorRef.current) {
      setRawMaterial(htmlToMarkdown(richEditorRef.current.innerHTML));
    }
  };

  const handleRawPaste = (e: React.ClipboardEvent) => {
    const html = e.clipboardData.getData('text/html');
    if (html && (html.includes('<table') || html.includes('<h1') || html.includes('<h2') || html.includes('<ul') || html.includes('<ol'))) {
      e.preventDefault();
      const md = htmlToMarkdown(html);
      const textarea = e.currentTarget as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentVal = textarea.value;
      const newVal = currentVal.substring(0, start) + md + currentVal.substring(end);
      setRawMaterial(newVal);
    }
  };

  const handleGenerateNotes = async () => {
    let contentToSend = rawMaterial.trim();
    if (inputMode === 'rich' && richEditorRef.current) {
      const currentHtml = richEditorRef.current.innerHTML;
      if (currentHtml && currentHtml !== '<br>') {
        contentToSend = htmlToMarkdown(currentHtml).trim();
      }
    }

    if (!contentToSend && !topicName.trim()) {
      setErrorMessage('Please provide study material or topic name.');
      return;
    }

    try {
      setGenerating(true);
      setErrorMessage('');
      setSuccessMessage('');

      const token = await currentUser.getIdToken();
      const res = await fetch(getApiUrl('/api/admin/syllabus/generate-notes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          topicName,
          topicNameHi,
          subjectName,
          examName,
          targetExams,
          rawMaterial: contentToSend
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate study notes');
      }

      let parsedData = data.structured;
      if (!parsedData && data.rawText) {
        try {
          let t = data.rawText.trim();
          if (t.startsWith('```')) {
            t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
          }
          const m = t.match(/\{[\s\S]*\}/);
          if (m) t = m[0].trim();
          parsedData = JSON.parse(t);
        } catch {
          parsedData = null;
        }
      }

      if (parsedData && typeof parsedData === 'object' && (parsedData.title || parsedData.chapters)) {
        setStudyData(parsedData);
      } else {
        setStudyData(createFallbackStructure(topicName, topicNameHi, subjectName, contentToSend, data.rawText));
      }

      setActiveView('preview');
      setSuccessMessage('CG GURU Study Module generated successfully! 🎓');
    } catch (err: any) {
      console.error('[Generate Notes Error]:', err);
      setErrorMessage(err.message || 'Error occurred while generating notes.');
    } finally {
      setGenerating(false);
    }
  };

  const createFallbackStructure = (tName: string, tHi: string, sName: string, raw: string, aiText?: string) => {
    let text = aiText || raw;
    // Clean any accidentally leaked JSON syntax
    if (text.includes('{"') || text.includes('"}') || text.includes('"title"')) {
      text = text
        .replace(/^[ \t]*["{}[\]]+[ \t]*/gm, '')
        .replace(/"[a-zA-Z0-9_-]+":\s*/g, '')
        .replace(/["\\]/g, '');
    }

    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(l => Boolean(l) && !/^[,\s{}[\]"':]+$/.test(l));

    // Extract tables from text if present
    const tableMatches = text.match(/((?:\|[^\n]+\|\r?\n)+)/g);
    const tables: any[] = [];
    if (tableMatches) {
      tableMatches.forEach((tblBlock, idx) => {
        const rows = tblBlock.trim().split(/\r?\n/).filter(r => !r.includes('---'));
        if (rows.length >= 2) {
          const headers = rows[0].split('|').map(c => c.trim()).filter(Boolean);
          const dataRows = rows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
          tables.push({
            title: `तालिका ${idx + 1}: महत्वपूर्ण तुलनात्मक विश्लेषण`,
            headers,
            rows: dataRows
          });
        }
      });
    }

    const bulletLines = lines.filter(l => l.startsWith('-') || l.startsWith('*') || /^\d+[.)]/.test(l));
    const oneLiners = bulletLines.length > 5 
      ? bulletLines.slice(0, 25).map(l => l.replace(/^[-*•\d.]+\s*/, ''))
      : lines.slice(0, 20);

    return {
      title: tName,
      titleHi: tHi || tName,
      subject: sName,
      subtitle: 'Premium Exam Notes',
      targetExams: targetExams.join(' • '),
      overview: {
        introduction: lines.slice(0, 3).join(' ') || `यह अध्ययन सामग्री ${tHi || tName} विषय पर केंद्रित है।`,
        importance: 'विगत वर्षों के CGPSC एवं CG Vyapam प्रश्न पत्रों में इस विषय का निरंतर महत्व रहा है।',
        examRelevance: 'प्रारंभिक एवं मुख्य परीक्षाओं में विश्लेषणात्मक तथा तथ्यात्मक दोनों प्रकार के प्रश्न पूछे जाते हैं।',
        quickFacts: oneLiners.slice(0, 8)
      },
      chapters: [
        {
          chapterNumber: '01',
          chapterTitle: tHi || tName,
          description: 'मुख्य अवधारणाएं, ऐतिहासिक/भौगोलिक पृष्ठभूमि एवं परीक्षा उपयोगी तथ्य',
          examFocus: 'तथ्यों का कालक्रम, प्रमुख शासक, नदियां, नीतियां और संवैधानिक प्रावधान सबसे अधिक पूछे जाते हैं।',
          sections: [
            {
              heading: 'अवधारणा एवं विस्तृत विश्लेषण',
              content: lines.slice(3, 25).join('\n\n') || raw,
              conceptCard: 'विषय के मूल सिद्धांतों को समझना परीक्षा में सटीक उत्तर देने हेतु अत्यंत महत्वपूर्ण है।',
              importantFactCard: 'सभी तिथियों, आंकड़ों और नामों को सावधानीपूर्वक याद रखें।',
              memoryTrick: 'तथ्यों को समयरेखा और तुलनात्मक सारणी के माध्यम से याद करें।'
            }
          ],
          tables: tables.length > 0 ? tables : undefined
        }
      ],
      oneLinerRevision: oneLiners.slice(0, 25),
      confusionBuster: [
        {
          oftenConfused: 'समान लगने वाले नाम, तिथियां या स्थान',
          correctInformation: 'सटीक स्रोत और आधिकारिक संदर्भ के अनुसार तथ्यों को स्पष्ट रखें।'
        }
      ],
      pyqSection: [
        {
          examYear: 'CGPSC / CG Vyapam',
          question: `${tHi || tName} से संबंधित प्रमुख तथ्य कौन सा है?`,
          answer: 'यह परीक्षा में कई बार पूछा गया महत्वपूर्ण बिंदु है।'
        }
      ],
      mcqs: [
        {
          q: `${tHi || tName} के संबंध में सत्य कथन का चयन कीजिए:`,
          options: ['A. यह राज्य की परीक्षा हेतु अति महत्वपूर्ण है', 'B. इसमें तथ्यात्मक सटीकता आवश्यक है', 'C. दोनों A और B सत्य हैं', 'D. उपरोक्त में से कोई नहीं'],
          correct: 'C',
          explanation: 'सभी प्रतियोगी परीक्षाओं में इस विषय से सीधे प्रश्न बनते हैं।'
        }
      ],
      rapidRevision: oneLiners.slice(0, 10),
      checklist: [
        'महत्वपूर्ण तिथियां एवं कालक्रम का पुनरीक्षण पूर्ण',
        'प्रमुख स्थान, नदियां एवं भौगोलिक तथ्य याद किए',
        'संबद्ध सरकारी नीतियां, आंकड़े एवं बजट तथ्य स्पष्ट',
        'भ्रम बिंदु (Confusion Buster) तालिका का अध्ययन किया',
        'सभी अभ्यास प्रश्नों (MCQs) का अभ्यास पूर्ण'
      ],
      sources: ['छत्तीसगढ़ संदर्भ एवं ग्रंथ अकादमी', 'आधिकारिक शासकीय गजट', 'CG GURU रिसर्च टीम']
    };
  };

  const handlePrint = () => {
    if (!printAreaRef.current) return;
    const content = printAreaRef.current.innerHTML;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(node => node.outerHTML)
      .join('\n');

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="hi">
        <head>
          <meta charset="utf-8">
          <title>${topicNameHi || topicName} - CG GURU Study Notes</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
          ${styles}
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 10mm 12mm 10mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: 'Noto Sans Devanagari', 'Inter', -apple-system, sans-serif !important;
              color: #1E293B !important;
              background: #FFFFFF !important;
              font-size: 10pt;
              line-height: 1.6;
            }
            .page-break {
              page-break-after: always !important;
              break-after: page !important;
            }
            .avoid-break {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 8px 0;
            }
            th, td {
              border: 1px solid #CBD5E1;
              padding: 6px 10px;
              font-size: 9pt;
            }
            th {
              background-color: #17375E !important;
              color: #FFFFFF !important;
              font-weight: 700;
            }
          </style>
        </head>
        <body>
          <div style="width: 100%; max-width: 800px; margin: 0 auto; padding: 0;">
            ${content}
          </div>
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 400);
  };

  const generatePdfBlob = async (): Promise<Blob> => {
    if (!printAreaRef.current) throw new Error('Preview element not found');
    const element = printAreaRef.current;

    // Render element to high-res canvas with oklab/oklch color fallback
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FFFFFF',
      scrollY: 0,
      windowWidth: element.scrollWidth || 800,
      logging: false,
      onclone: (clonedDoc, clonedEl) => {
        // Strip any style tags that might inject oklab/oklch or modern CSS color functions
        const styleTags = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
        styleTags.forEach(tag => {
          if (tag.tagName === 'STYLE' && tag.textContent && (tag.textContent.includes('oklab') || tag.textContent.includes('oklch'))) {
            tag.textContent = tag.textContent
              .replace(/oklab\([^)]+\)/gi, '#1E293B')
              .replace(/oklch\([^)]+\)/gi, '#1E293B');
          }
        });

        // Ensure all elements in the cloned DOM have standard safe inline colors if computed styles use oklab
        const allElements = clonedEl.querySelectorAll('*');
        allElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          if (htmlEl.style) {
            const inlineColor = htmlEl.style.color;
            if (inlineColor && (inlineColor.includes('oklab') || inlineColor.includes('oklch'))) {
              htmlEl.style.color = '#1E293B';
            }
            const inlineBg = htmlEl.style.backgroundColor;
            if (inlineBg && (inlineBg.includes('oklab') || inlineBg.includes('oklch'))) {
              htmlEl.style.backgroundColor = '#FFFFFF';
            }
            const inlineBorder = htmlEl.style.borderColor;
            if (inlineBorder && (inlineBorder.includes('oklab') || inlineBorder.includes('oklch'))) {
              htmlEl.style.borderColor = '#CBD5E1';
            }
          }
        });
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Standard A4 dimensions in mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 8; // 8mm margin
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    let heightLeft = contentHeight;
    let position = margin;

    // Add first page
    pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
    heightLeft -= (pageHeight - (margin * 2));

    // Add additional pages if content exceeds 1 page
    while (heightLeft > 0) {
      position = margin - (contentHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
      heightLeft -= (pageHeight - (margin * 2));
    }

    return pdf.output('blob');
  };

  const handleDownloadPdf = async () => {
    try {
      setExportingPdf(true);
      setErrorMessage('');
      const blob = await generatePdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(topicNameHi || topicName).replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_CG_GURU_Notes.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSuccessMessage('PDF downloaded successfully! 📥');
    } catch (err: any) {
      console.error('[Download PDF Error]:', err);
      // Fallback directly to print window so user is never blocked
      handlePrint();
      setErrorMessage('Direct download encountered an issue. Print dialog has been opened as fallback.');
    } finally {
      setExportingPdf(false);
    }
  };

  const handleAttachToTopic = async () => {
    try {
      setAttachingToTopic(true);
      setErrorMessage('');
      setSuccessMessage('Generating PDF and uploading to Supabase...');

      const blob = await generatePdfBlob();
      const fileName = `${(topicNameHi || topicName).replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_')}_Study_Notes.pdf`;
      const file = new File([blob], fileName, { type: 'application/pdf' });

      await onAttachPdf(examId, topic.id, file);
      setSuccessMessage(`Attached "${fileName}" directly to topic notes in Supabase! 📄🎉`);
    } catch (err: any) {
      console.error('[Attach PDF Error]:', err);
      // If canvas generation fails or oklab issues occur, guide user to save formatted notes or print
      setErrorMessage(err.message || 'Failed to attach generated PDF to topic. You can click "Save Formatted Notes to Topic" instead to enable the In-App Reader instantly!');
    } finally {
      setAttachingToTopic(false);
    }
  };

  const handleSaveFormattedNotes = async () => {
    if (!studyData) {
      setErrorMessage('No structured study notes found to save. Please generate notes first.');
      return;
    }

    try {
      setSavingNotes(true);
      setErrorMessage('');
      setSuccessMessage('Saving formatted study notes to topic...');

      if (onSaveNotes) {
        await onSaveNotes(examId, topic.id, studyData);
      } else {
        const token = await currentUser.getIdToken();
        const res = await fetch(getApiUrl('/api/admin/syllabus/topic-notes'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            examId,
            topicId: topic.id,
            studyNotes: studyData
          })
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to save formatted study notes');
        }
      }

      setSuccessMessage(`Saved formatted interactive notes to "${topicNameHi || topicName}"! 📖✨`);
    } catch (err: any) {
      console.error('[Save Notes Error]:', err);
      setErrorMessage(err.message || 'Failed to save study notes.');
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-bg-s2 border border-border rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Modal Topbar */}
        <div className="px-5 py-3.5 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-saffron/15 border border-saffron-border/30 flex items-center justify-center text-saffron shrink-0 font-black">
              📄
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-black text-text truncate leading-tight">
                  CG GURU • Study Notes PDF Studio
                </h3>
                <span className="text-[9px] bg-saffron/15 text-saffron border border-saffron/30 px-2 py-0.5 rounded-full font-black uppercase">
                  Premium Module
                </span>
              </div>
              <span className="text-[10px] text-text-muted mt-0.5 truncate">
                {subjectName} • {topicNameHi || topicName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeView === 'preview' && (
              <button
                type="button"
                onClick={() => setActiveView('editor')}
                className="px-3 py-1.5 bg-bg-s2 hover:bg-bg-s1 border border-border rounded-lg text-xs font-bold text-text flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Edit Input</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-bg-s2 hover:bg-red-500/20 border border-border hover:border-red-500/40 text-text-muted hover:text-redL rounded-lg cursor-pointer transition-colors"
              title="Close Studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMessage && (
          <div className="px-5 py-2.5 bg-greenL/15 border-b border-greenL/30 text-greenL text-xs flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage('')} className="text-greenL hover:opacity-80">✕</button>
          </div>
        )}
        {errorMessage && (
          <div className="px-5 py-2.5 bg-red-500/15 border-b border-red-500/30 text-redL text-xs flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage('')} className="text-redL hover:opacity-80">✕</button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-bg-s1 flex flex-col">
          {activeView === 'editor' ? (
            <div className="max-w-4xl w-full mx-auto p-5 sm:p-6 flex flex-col gap-5">
              
              {/* Info Guide Card */}
              <div className="p-4 bg-gradient-to-r from-saffron/10 via-bg-s2 to-bg-s2 border border-saffron-border/40 rounded-xl flex items-start gap-3 shadow-sm">
                <Sparkles className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-black text-text uppercase tracking-wider">
                    Paste Study Material & Generate Exam-Oriented PDF
                  </span>
                  <p className="text-text-muted leading-relaxed">
                    Aap is topic ke liye notes, textbook text, facts, dates, MCQs ya coaching material yahan paste kar sakte hain. 
                    CG GURU AI use karke ise <strong>Cover Page, Quick Facts, Chapter Hierarchy, Exam Focus Cards, One-Liner Revision, Confusion Buster, aur MCQs</strong> ke sath complete Premium PDF me transform kar dega.
                  </p>
                </div>
              </div>

              {/* Topic Metadata Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-bg-s2 border border-border p-4 rounded-xl shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Topic Name (Hindi)</label>
                  <input
                    type="text"
                    value={topicNameHi}
                    onChange={(e) => setTopicNameHi(e.target.value)}
                    placeholder="e.g. छत्तीसगढ़ का इतिहास"
                    className="w-full bg-bg-s3 text-xs text-text font-bold border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Topic Name (English)</label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="e.g. History of Chhattisgarh"
                    className="w-full bg-bg-s3 text-xs text-text font-bold border border-border focus:border-saffron px-3 py-2 rounded-lg outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Subject</label>
                  <input
                    type="text"
                    value={subjectName}
                    readOnly
                    className="w-full bg-bg-s3/60 text-xs text-text-muted font-bold border border-border px-3 py-2 rounded-lg outline-none cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black uppercase text-text-muted">Target Exam Context</label>
                  <input
                    type="text"
                    value={examName}
                    readOnly
                    className="w-full bg-bg-s3/60 text-xs text-text-muted font-bold border border-border px-3 py-2 rounded-lg outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Target Exams Selection */}
              <div className="flex flex-col gap-2 bg-bg-s2 border border-border p-4 rounded-xl shadow-sm">
                <label className="text-[10px] font-black uppercase text-text-muted">Target Competitive Exams (Badge List)</label>
                <div className="flex flex-wrap gap-2">
                  {['CGPSC', 'CG Vyapam', 'Chhattisgarh Police', 'SI', 'Patwari', 'Teacher', 'Forest Guard', 'Other State Exams'].map(ex => {
                    const isSelected = targetExams.includes(ex);
                    return (
                      <button
                        key={ex}
                        type="button"
                        onClick={() => {
                          if (isSelected) setTargetExams(targetExams.filter(t => t !== ex));
                          else setTargetExams([...targetExams, ex]);
                        }}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-saffron text-bg-s1 border-saffron shadow-sm'
                            : 'bg-bg-s3 border-border text-text-muted hover:text-text'
                        }`}
                      >
                        {ex}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Study Material Input Area */}
              <div className="flex flex-col gap-2.5">
                <style>{`
                  .study-pasted-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                    font-size: 11px;
                  }
                  .study-pasted-table th, .study-pasted-table td {
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    padding: 6px 10px;
                    text-align: left;
                  }
                  .study-pasted-table th {
                    background-color: rgba(232, 138, 0, 0.15);
                    color: #e88a00;
                    font-weight: 800;
                  }
                  .study-pasted-table td {
                    background-color: rgba(255, 255, 255, 0.04);
                  }
                  .rich-editor:empty:before {
                    content: attr(data-placeholder);
                    color: #64748b;
                    pointer-events: none;
                    display: block;
                  }
                `}</style>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-xs font-black uppercase text-text flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-saffron" />
                    <span>Study Material / Raw Content *</span>
                  </label>

                  {/* Mode Switcher Tabs */}
                  <div className="flex items-center gap-1 bg-bg-s3 p-1 rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={switchToRich}
                      className={`px-2.5 py-1 rounded text-[11px] font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                        inputMode === 'rich'
                          ? 'bg-saffron text-bg-s1 shadow-xs'
                          : 'text-text-muted hover:text-text'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Rich Visual Editor (Tables & Format Preserved)</span>
                    </button>
                    <button
                      type="button"
                      onClick={switchToRaw}
                      className={`px-2.5 py-1 rounded text-[11px] font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                        inputMode === 'raw'
                          ? 'bg-saffron text-bg-s1 shadow-xs'
                          : 'text-text-muted hover:text-text'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Markdown / Raw</span>
                    </button>
                  </div>
                </div>

                {/* Formatting Toolbar for Rich Editor */}
                {inputMode === 'rich' && (
                  <div className="flex items-center justify-between gap-2 p-2 bg-bg-s3/80 border border-border rounded-xl flex-wrap">
                    <div className="flex items-center gap-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => formatCommand('bold')}
                        className="p-1.5 rounded hover:bg-bg-s2 border border-border/50 text-text hover:text-saffron transition-colors cursor-pointer"
                        title="Bold (Ctrl+B)"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatCommand('italic')}
                        className="p-1.5 rounded hover:bg-bg-s2 border border-border/50 text-text hover:text-saffron transition-colors cursor-pointer"
                        title="Italic (Ctrl+I)"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatCommand('formatBlock', '<h2>')}
                        className="px-2 py-1 rounded hover:bg-bg-s2 border border-border/50 text-text hover:text-saffron transition-colors text-[11px] font-black cursor-pointer"
                        title="Heading"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => formatCommand('insertUnorderedList')}
                        className="p-1.5 rounded hover:bg-bg-s2 border border-border/50 text-text hover:text-saffron transition-colors cursor-pointer"
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => formatCommand('insertOrderedList')}
                        className="p-1.5 rounded hover:bg-bg-s2 border border-border/50 text-text hover:text-saffron transition-colors cursor-pointer"
                        title="Numbered List"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-[1px] h-4 bg-border/80 mx-1" />

                      <button
                        type="button"
                        onClick={handleInsertTable}
                        className="px-2.5 py-1 rounded bg-saffron/10 hover:bg-saffron/20 border border-saffron/30 text-saffron text-[11px] font-black flex items-center gap-1 cursor-pointer transition-colors"
                        title="Insert formatted table"
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span>+ Table</span>
                      </button>

                      <button
                        type="button"
                        onClick={handlePasteFromClipboard}
                        className="px-2.5 py-1 rounded bg-bg-s2 hover:bg-bg-s1 border border-border text-text text-[11px] font-black flex items-center gap-1 cursor-pointer transition-colors"
                        title="Paste from clipboard preserving format"
                      >
                        <ClipboardPaste className="w-3.5 h-3.5 text-greenL" />
                        <span>Paste Formatted</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleClearContent}
                      className="p-1.5 rounded hover:bg-redL/10 text-text-muted hover:text-redL transition-colors cursor-pointer text-[11px] flex items-center gap-1"
                      title="Clear Content"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}

                {/* Editor Area */}
                {inputMode === 'rich' ? (
                  <div className="relative">
                    <div
                      ref={richEditorRef}
                      contentEditable={true}
                      onPaste={handleRichPaste}
                      onInput={handleRichInput}
                      data-placeholder="Paste your study material here from MS Word, Web, PDF, or Excel... Tables, headings, bold text, and lists will be faithfully preserved!"
                      className="rich-editor w-full min-h-[360px] max-h-[480px] overflow-y-auto bg-bg-s2 text-xs text-text border border-border focus:border-saffron p-4 rounded-xl outline-none leading-relaxed font-sans shadow-inner selection:bg-saffron/25"
                    />
                  </div>
                ) : (
                  <textarea
                    value={rawMaterial}
                    onChange={(e) => setRawMaterial(e.target.value)}
                    onPaste={handleRawPaste}
                    placeholder={`Yahan topic ki sabhi facts, theory, dates, tables, points copy-paste karein...\n\nTables can be written in Markdown format:\n| कॉलम 1 | कॉलम 2 | कॉलम 3 |\n|---|---|---|\n| डेटा 1 | डेटा 2 | डेटा 3 |`}
                    rows={14}
                    className="w-full bg-bg-s2 text-xs text-text border border-border focus:border-saffron p-4 rounded-xl outline-none leading-relaxed font-mono resize-y shadow-inner"
                  />
                )}

                <div className="flex items-center justify-between text-[10px] text-text-muted px-1">
                  <span>💡 Tip: Word, Excel ya Web se table direct copy karke yahan paste karein - formatting aur tables bilkul intact rahenge!</span>
                  <span>{rawMaterial.length} characters</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-[10px] text-text-muted">
                  Note: AI automatically arranges your material into standard CG GURU PDF theme.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={generating || !rawMaterial.trim()}
                    onClick={handleGenerateNotes}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-saffron hover:bg-orange-500 disabled:opacity-50 text-bg-s1 text-xs font-black uppercase rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer transition-all"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Structuring & Designing Module...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate CG GURU Premium PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              
              {/* Preview Action Toolbar */}
              <div className="px-5 py-3 bg-bg-s3 border-b border-border flex items-center justify-between gap-3 flex-wrap shrink-0 sticky top-0 z-20 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-text">PDF Document Ready</span>
                  <span className="text-[9px] bg-greenL/15 text-greenL border border-greenL/30 px-2 py-0.5 rounded font-black">
                    A4 Clean Format
                  </span>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 bg-bg-s2 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5 text-saffron" />
                    <span>Print / Save as PDF</span>
                  </button>

                  <button
                    type="button"
                    disabled={exportingPdf}
                    onClick={handleDownloadPdf}
                    className="px-3.5 py-1.5 bg-bg-s2 hover:bg-bg-s1 border border-border text-xs font-black uppercase text-text rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  >
                    {exportingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 text-blue-400" />}
                    <span>Download PDF</span>
                  </button>

                  <button
                    type="button"
                    disabled={savingNotes}
                    onClick={handleSaveFormattedNotes}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white text-xs font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                    title="Save structured notes for in-app Interactive Reader Modal"
                  >
                    {savingNotes ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BookOpen className="w-3.5 h-3.5" />}
                    <span>Save Formatted Notes to Topic</span>
                  </button>

                  <button
                    type="button"
                    disabled={attachingToTopic}
                    onClick={handleAttachToTopic}
                    className="px-3.5 py-1.5 bg-saffron/20 hover:bg-saffron/30 text-saffron border border-saffron/40 disabled:opacity-60 text-xs font-black uppercase rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  >
                    {attachingToTopic ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                    <span>Attach PDF to Topic</span>
                  </button>
                </div>
              </div>

              {/* PDF Document Canvas */}
              <div className="p-4 sm:p-8 flex justify-center overflow-x-auto bg-[#1A1D24]">
                <div 
                  ref={printAreaRef}
                  id="cg-guru-pdf-root"
                  className="w-full max-w-[800px] bg-white text-[#1E293B] p-8 sm:p-12 shadow-2xl rounded-sm font-sans flex flex-col gap-8 leading-relaxed print:p-0 print:shadow-none print:w-full print:max-w-none print:gap-6"
                  style={{ fontFamily: "'Noto Sans Devanagari', Inter, sans-serif" }}
                >
                  
                  {/* Print Stylesheet */}
                  <style>{`
                    @media print {
                      @page {
                        size: A4 portrait;
                        margin: 12mm 12mm 15mm 12mm;
                      }
                      body, html {
                        background: #FFFFFF !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        margin: 0 !important;
                        padding: 0 !important;
                      }
                      #cg-guru-pdf-root {
                        padding: 0 !important;
                        box-shadow: none !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        background: #FFFFFF !important;
                      }
                      .page-break {
                        page-break-after: always !important;
                        break-after: page !important;
                      }
                      .avoid-break {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                      }
                    }
                  `}</style>

                  {/* Running Header for Sections */}
                  <div className="hidden print:flex items-center justify-between border-b border-[#CBD5E1] pb-2 text-[9pt] text-[#64748B]">
                    <span className="font-bold text-[#17375E]">CG GURU • छत्तीसगढ़ प्रतियोगी परीक्षा अध्ययन सामग्री</span>
                    <span>विषय: {studyData?.subject || subjectName}</span>
                  </div>

                  {/* PAGE 1: COVER PAGE */}
                  <div className="min-h-[960px] flex flex-col justify-between p-8 sm:p-12 bg-white rounded-xl border border-[#D9E0E8] shadow-sm relative overflow-hidden page-break avoid-break">
                    <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#17375E] via-[#E88A00] to-[#17375E]" />
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#E88A00] text-white flex items-center justify-center font-black text-2xl shadow-md">
                          🎓
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-2xl font-black text-[#17375E] tracking-wider">
                            CG GURU
                          </h1>
                          <span className="text-[11px] font-bold text-[#E88A00] tracking-wide">
                            छत्तीसगढ़ की तैयारी, एक जगह
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-black uppercase px-3 py-1 bg-[#EEF4FA] text-[#17375E] rounded-full border border-[#D9E0E8]">
                        Exclusive Study Notes
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 my-auto py-12 text-center items-center">
                      <span className="text-xs font-black uppercase text-[#E88A00] tracking-widest bg-[#FFF4E5] px-3.5 py-1.5 rounded-md border border-[#E88A00]/30">
                        {studyData?.subject || subjectName}
                      </span>

                      <h2 className="text-3xl sm:text-4xl font-black text-[#17375E] leading-tight max-w-xl">
                        {studyData?.titleHi || topicNameHi || studyData?.title || topicName}
                      </h2>

                      {studyData?.title && studyData?.title !== studyData?.titleHi && (
                        <span className="text-base font-semibold text-[#667085]">
                          {studyData.title}
                        </span>
                      )}

                      <div className="w-24 h-1 bg-[#E88A00] rounded-full my-2" />

                      <span className="text-sm font-bold text-[#17375E] uppercase tracking-wider">
                        छत्तीसगढ़ प्रतियोगी परीक्षा अध्ययन सामग्री
                      </span>

                      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-lg">
                        {(studyData?.targetExams || targetExams.join(' • ')).split('•').map((ex: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-bold bg-[#EEF4FA] text-[#17375E] border border-[#D9E0E8] px-2.5 py-1 rounded-md">
                            {ex.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[#D9E0E8] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#667085] gap-2">
                      <span className="font-bold text-[#17375E]">
                        Concept • Facts • Revision • MCQs
                      </span>
                      <span>
                        Designed for Serious Aspirants • CG GURU
                      </span>
                    </div>
                  </div>

                  {/* PAGE 2: TOPIC OVERVIEW & QUICK FACTS */}
                  <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm page-break avoid-break">
                    <div className="flex items-center justify-between border-b border-[#D9E0E8] pb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#E88A00]" />
                        <h3 className="text-base font-black text-[#17375E] uppercase tracking-wider">
                          Topic Overview & Significance
                        </h3>
                      </div>
                      <span className="text-[10px] font-bold text-[#667085]">
                        CG GURU • Page 02
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 text-sm text-[#202938] leading-relaxed">
                      <p className="font-medium">
                        {studyData?.overview?.introduction}
                      </p>
                      {studyData?.overview?.examRelevance && (
                        <div className="p-3 bg-[#EEF4FA] border border-[#D9E0E8] rounded-xl text-xs text-[#17375E] flex items-center gap-2 font-semibold">
                          <Award className="w-4 h-4 text-[#E88A00] shrink-0" />
                          <span><strong>परीक्षा प्रासंगिकता:</strong> {studyData.overview.examRelevance}</span>
                        </div>
                      )}
                    </div>

                    {Array.isArray(studyData?.overview?.quickFacts) && studyData.overview.quickFacts.length > 0 && (
                      <div className="p-5 bg-[#FFF4E5] border border-[#E88A00]/40 rounded-xl flex flex-col gap-3 shadow-sm">
                        <div className="flex items-center gap-2 text-[#E88A00] font-black text-xs uppercase tracking-wider">
                          <Sparkles className="w-4 h-4" />
                          <span>⚡ Quick Facts • परीक्षा उपयोगी महत्वपूर्ण तथ्य</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#202938]">
                          {studyData.overview.quickFacts.map((fact: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-[#E88A00]/20 font-medium">
                              <span className="text-[#E88A00] font-black">✓</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CHAPTERS & DETAILED THEORY */}
                  {Array.isArray(studyData?.chapters) && studyData.chapters.map((chap: any, cIdx: number) => (
                    <div key={cIdx} className="flex flex-col gap-6 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="border-b border-[#D9E0E8] pb-4 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-[#E88A00] tracking-widest">
                            CHAPTER {chap.chapterNumber || (cIdx + 1 < 10 ? `0${cIdx + 1}` : cIdx + 1)}
                          </span>
                          <span className="text-[10px] font-bold text-[#667085]">
                            CG GURU Study Module
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-[#17375E]">
                          {chap.chapterTitle}
                        </h3>
                        {chap.description && (
                          <p className="text-xs text-[#667085]">
                            {chap.description}
                          </p>
                        )}
                      </div>

                      {chap.examFocus && (
                        <div className="p-4 bg-[#EEF4FA] border border-[#D9E0E8] rounded-xl flex items-start gap-3 shadow-xs">
                          <div className="w-7 h-7 rounded-lg bg-[#17375E] text-white flex items-center justify-center font-black text-xs shrink-0">
                            🎯
                          </div>
                          <div className="flex flex-col text-xs">
                            <span className="font-black text-[#17375E] uppercase tracking-wider">
                              EXAM FOCUS
                            </span>
                            <span className="text-[#202938] mt-0.5 leading-relaxed font-medium">
                              {chap.examFocus}
                            </span>
                          </div>
                        </div>
                      )}

                      {Array.isArray(chap.sections) && chap.sections.map((sec: any, sIdx: number) => (
                        <div key={sIdx} className="flex flex-col gap-3 pt-2">
                          <h4 className="text-sm font-black text-[#17375E] flex items-center gap-2">
                            <span className="w-1.5 h-4 bg-[#E88A00] rounded-full shrink-0" />
                            <span>{sec.heading}</span>
                          </h4>

                          <div className="text-xs text-[#202938] leading-relaxed whitespace-pre-line font-medium pl-3.5">
                            {sec.content}
                          </div>

                          {sec.conceptCard && (
                            <div className="p-3.5 bg-[#FFF4E5] border border-[#E88A00]/30 rounded-xl text-xs text-[#202938] flex items-start gap-2.5 font-medium ml-3.5">
                              <span className="text-base shrink-0">💡</span>
                              <div>
                                <strong className="text-[#E88A00] uppercase block text-[10px] font-black">संकल्पना (Concept):</strong>
                                <span>{sec.conceptCard}</span>
                              </div>
                            </div>
                          )}

                          {sec.importantFactCard && (
                            <div className="p-3.5 bg-[#EEF4FA] border border-[#D9E0E8] rounded-xl text-xs text-[#17375E] flex items-start gap-2.5 font-medium ml-3.5">
                              <span className="text-base shrink-0">⭐</span>
                              <div>
                                <strong className="text-[#17375E] uppercase block text-[10px] font-black">महत्वपूर्ण तथ्य:</strong>
                                <span>{sec.importantFactCard}</span>
                              </div>
                            </div>
                          )}

                          {sec.memoryTrick && (
                            <div className="p-3.5 bg-[#EAF7F1] border border-[#2E9B6F]/30 rounded-xl text-xs text-[#202938] flex items-start gap-2.5 font-medium ml-3.5">
                              <span className="text-base shrink-0">🧠</span>
                              <div>
                                <strong className="text-[#2E9B6F] uppercase block text-[10px] font-black">याद रखने की ट्रिक (Memory Trick):</strong>
                                <span>{sec.memoryTrick}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {Array.isArray(chap.tables) && chap.tables.map((tbl: any, tIdx: number) => (
                        <div key={tIdx} className="flex flex-col gap-2 mt-3 overflow-x-auto">
                          <span className="text-xs font-black text-[#17375E] uppercase tracking-wide">
                            {tbl.title}
                          </span>
                          <table className="w-full border-collapse border border-[#D9E0E8] text-xs rounded-xl overflow-hidden shadow-xs">
                            <thead>
                              <tr className="bg-[#17375E] text-white">
                                {Array.isArray(tbl.headers) && tbl.headers.map((h: string, hIdx: number) => (
                                  <th key={hIdx} className="p-2.5 text-left font-black border border-[#D9E0E8]/40">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(tbl.rows) && tbl.rows.map((r: any, rIdx: number) => {
                                const cells = getRowCells(r);
                                return (
                                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-[#F5F7FA]' : 'bg-white'}>
                                    {cells.map((cell: any, cjIdx: number) => (
                                      <td key={cjIdx} className="p-2.5 border border-[#D9E0E8] font-medium text-[#202938]">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* GLOBAL / ROOT LEVEL TABLES IF PROVIDED */}
                  {Array.isArray(studyData?.tables) && studyData.tables.length > 0 && (
                    <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="border-b border-[#D9E0E8] pb-3 flex items-center gap-2">
                        <span className="text-lg">📊</span>
                        <h3 className="text-base font-black text-[#17375E] uppercase tracking-wider">
                          तुलनात्मक सारणी एवं पुरातात्विक स्थल सूची (Comparative Tables)
                        </h3>
                      </div>
                      {studyData.tables.map((tbl: any, tIdx: number) => (
                        <div key={tIdx} className="flex flex-col gap-2 overflow-x-auto">
                          {tbl.title && (
                            <span className="text-xs font-black text-[#17375E] uppercase tracking-wide">
                              {tbl.title}
                            </span>
                          )}
                          <table className="w-full border-collapse border border-[#D9E0E8] text-xs rounded-xl overflow-hidden shadow-xs">
                            <thead>
                              <tr className="bg-[#17375E] text-white">
                                {Array.isArray(tbl.headers) && tbl.headers.map((h: string, hIdx: number) => (
                                  <th key={hIdx} className="p-2.5 text-left font-black border border-[#D9E0E8]/40">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(tbl.rows) && tbl.rows.map((r: any, rIdx: number) => {
                                const cells = getRowCells(r);
                                return (
                                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-[#F5F7FA]' : 'bg-white'}>
                                    {cells.map((cell: any, cjIdx: number) => (
                                      <td key={cjIdx} className="p-2.5 border border-[#D9E0E8] font-medium text-[#202938]">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ONE-LINER REVISION */}
                  {Array.isArray(studyData?.oneLinerRevision) && studyData.oneLinerRevision.length > 0 && (
                    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="flex items-center justify-between border-b border-[#D9E0E8] pb-3">
                        <div className="flex items-center gap-2 text-[#E88A00]">
                          <span className="text-lg">⚡</span>
                          <h3 className="text-base font-black text-[#17375E] uppercase tracking-wider">
                            One-Liner Rapid Revision (एक पंक्ति में त्वरित दोहराव)
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold bg-[#FFF4E5] text-[#E88A00] px-2.5 py-0.5 rounded-full border border-[#E88A00]/30 font-black">
                          {studyData.oneLinerRevision.length} Facts
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#202938]">
                        {studyData.oneLinerRevision.map((point: string, pIdx: number) => (
                          <div key={pIdx} className="flex items-start gap-2 bg-[#F5F7FA] p-2.5 rounded-lg border border-[#D9E0E8] font-medium">
                            <span className="text-[#E88A00] font-black text-[11px] shrink-0">
                              {pIdx + 1}.
                            </span>
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CONFUSION BUSTER */}
                  {Array.isArray(studyData?.confusionBuster) && studyData.confusionBuster.length > 0 && (
                    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="flex items-center gap-2 text-[#17375E] border-b border-[#D9E0E8] pb-3">
                        <span className="text-lg">⚠️</span>
                        <h3 className="text-base font-black uppercase tracking-wider">
                          Confusion Buster (प्रायः होने वाले भ्रम एवं सटीक तथ्य)
                        </h3>
                      </div>

                      <table className="w-full border-collapse border border-[#D9E0E8] text-xs rounded-xl overflow-hidden shadow-xs">
                        <thead>
                          <tr className="bg-[#17375E] text-white">
                            <th className="p-3 text-left font-black w-1/2 border border-[#D9E0E8]/40">
                              अक्सर होने वाला भ्रम (Often Confused)
                            </th>
                            <th className="p-3 text-left font-black w-1/2 border border-[#D9E0E8]/40 bg-[#E88A00]">
                              सटीक तथ्य एवं प्रमाण (Correct Information)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {studyData.confusionBuster.map((item: any, iIdx: number) => (
                            <tr key={iIdx} className={iIdx % 2 === 1 ? 'bg-[#F5F7FA]' : 'bg-white'}>
                              <td className="p-3 border border-[#D9E0E8] font-medium text-red-700 bg-red-500/5">
                                ❌ {item.oftenConfused}
                              </td>
                              <td className="p-3 border border-[#D9E0E8] font-medium text-[#2E9B6F] bg-[#2E9B6F]/5">
                                ✓ {item.correctInformation}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* PYQ SECTION */}
                  {Array.isArray(studyData?.pyqSection) && studyData.pyqSection.length > 0 && (
                    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="flex items-center gap-2 text-[#17375E] border-b border-[#D9E0E8] pb-3">
                        <span className="text-lg">📚</span>
                        <h3 className="text-base font-black uppercase tracking-wider">
                          PYQ Focus (विगत वर्षों में पूछे गए प्रश्न)
                        </h3>
                      </div>

                      <div className="flex flex-col gap-3 text-xs">
                        {studyData.pyqSection.map((pyq: any, qIdx: number) => (
                          <div key={qIdx} className="p-3.5 bg-[#EEF4FA] border border-[#D9E0E8] rounded-xl flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase text-[#E88A00]">
                                {pyq.examYear || 'CGPSC / CG Vyapam'}
                              </span>
                            </div>
                            <span className="font-bold text-[#17375E]">
                              {pyq.question}
                            </span>
                            <span className="text-[#2E9B6F] font-semibold text-[11px]">
                              उत्तर: {pyq.answer}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRACTICE MCQS */}
                  {Array.isArray(studyData?.mcqs) && studyData.mcqs.length > 0 && (
                    <div className="flex flex-col gap-4 bg-white p-8 rounded-2xl border border-[#D9E0E8] shadow-sm avoid-break">
                      <div className="flex items-center justify-between border-b border-[#D9E0E8] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎯</span>
                          <h3 className="text-base font-black text-[#17375E] uppercase tracking-wider">
                            Exam Practice MCQs (अभ्यास प्रश्न उत्तर)
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold bg-[#EAF7F1] text-[#2E9B6F] border border-[#2E9B6F]/30 px-2 py-0.5 rounded-full font-black">
                          {studyData.mcqs.length} Questions
                        </span>
                      </div>

                      <div className="flex flex-col gap-4 text-xs">
                        {studyData.mcqs.map((mcq: any, mIdx: number) => (
                          <div key={mIdx} className="p-4 bg-[#F5F7FA] border border-[#D9E0E8] rounded-xl flex flex-col gap-2.5">
                            <span className="font-black text-[#17375E] leading-snug">
                              Q{mIdx + 1}. {mcq.q}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {Array.isArray(mcq.options) && mcq.options.map((opt: string, oIdx: number) => (
                                <span key={oIdx} className="p-2 bg-white rounded border border-[#D9E0E8] text-[#202938]">
                                  {opt}
                                </span>
                              ))}
                            </div>
                            <div className="mt-1 pt-2 border-t border-[#D9E0E8] flex flex-col gap-1">
                              <span className="text-[11px] font-black text-[#2E9B6F]">
                                सही उत्तर: विकल्प ({mcq.correct})
                              </span>
                              {mcq.explanation && (
                                <span className="text-[10.5px] text-[#667085] leading-relaxed">
                                  <strong>व्याख्या:</strong> {mcq.explanation}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RAPID REVISION & CHECKLIST */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 avoid-break">
                    <div className="p-6 bg-white border border-[#D9E0E8] rounded-2xl flex flex-col gap-3 shadow-sm">
                      <div className="flex items-center gap-2 text-[#E88A00] font-black text-xs uppercase tracking-wider border-b border-[#D9E0E8] pb-2">
                        <span>🚀</span>
                        <span>Rapid Revision (त्वरित पुनरीक्षण)</span>
                      </div>
                      <ul className="flex flex-col gap-2 text-xs text-[#202938]">
                        {(studyData?.rapidRevision || []).map((pt: string, rIdx: number) => (
                          <li key={rIdx} className="flex items-start gap-2 font-medium">
                            <span className="text-[#E88A00] font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 bg-white border border-[#D9E0E8] rounded-2xl flex flex-col gap-3 shadow-sm">
                      <div className="flex items-center gap-2 text-[#17375E] font-black text-xs uppercase tracking-wider border-b border-[#D9E0E8] pb-2">
                        <span>✅</span>
                        <span>Exam Checklist (परीक्षा चेकलिस्ट)</span>
                      </div>
                      <div className="flex flex-col gap-2 text-xs text-[#202938]">
                        {(studyData?.checklist || []).map((chk: string, cIdx: number) => (
                          <label key={cIdx} className="flex items-center gap-2 font-medium cursor-pointer">
                            <input type="checkbox" defaultChecked className="accent-[#E88A00] rounded w-3.5 h-3.5" />
                            <span>{chk}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SOURCES & REFERENCES */}
                  <div className="p-6 bg-white border border-[#D9E0E8] rounded-2xl flex flex-col gap-2 text-xs text-[#667085] avoid-break">
                    <span className="font-black text-[#17375E] uppercase tracking-wider text-[11px]">
                      📖 प्रमाणिक स्रोत एवं संदर्भ (Sources & References)
                    </span>
                    <p className="leading-relaxed">
                      {(studyData?.sources || []).join(' • ') || 'छत्तीसगढ़ ग्रंथ अकादमी • आर्थिक सर्वेक्षण • आधिकारिक सरकारी गजट'}
                    </p>
                    <div className="border-t border-[#D9E0E8] pt-3 mt-2 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#E88A00]">CG GURU Educational Ecosystem</span>
                      <span>Prepared for State Competitive Exams</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
