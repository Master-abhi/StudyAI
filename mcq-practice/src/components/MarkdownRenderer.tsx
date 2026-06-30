import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  pClassName?: string;
}

// ─── Mermaid diagram block ─────────────────────────────────────────────────
let mermaidInitialized = false;

const sanitizeMermaidCode = (code: string): string => {
  let cleaned = code;
  // 1. Fix invalid arrow label endings like "-->|text|> Node" or "-->|text|-> Node"
  cleaned = cleaned.replace(/-->\s*\|([^|]+)\|\s*(?:>|-->|->)\s*/g, '-->|$1| ');
  // 2. Quote node labels containing parentheses if not already quoted
  cleaned = cleaned.replace(/(\b\w+)\s*\[\s*([^"\]\n]*\([^)\n]+\)[^"\]\n]*)\s*\]/g, '$1["$2"]');
  cleaned = cleaned.replace(/(\b\w+)\s*\(\s*([^")\n]*\([^)\n]+\)[^")\n]*)\s*\)/g, '$1("$2")');
  return cleaned;
};

const MermaidDiagram = React.memo(({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const renderId = `mermaid-${Math.random().toString(36).slice(2)}`;

    const render = async () => {
      const mermaid = (await import('mermaid')).default;

      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            background: '#0B0E14',
            primaryColor: '#F5A623',
            primaryTextColor: '#E6EDF3',
            primaryBorderColor: '#30363D',
            lineColor: '#8B949E',
            secondaryColor: '#161B22',
            tertiaryColor: '#21262D',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '13px',
          },
        });
        mermaidInitialized = true;
      }

      if (!ref.current || cancelled) return;

      try {
        const sanitizedCode = sanitizeMermaidCode(code);
        const { svg } = await mermaid.render(renderId, sanitizedCode);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled && ref.current) {
          setError(String(err));
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [code]);

  if (error) {
    return (
      <pre className="my-4 overflow-x-auto rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400">
        [Diagram Error] {error}
      </pre>
    );
  }

  return (
    <div
      ref={ref}
      className="my-4 flex justify-center overflow-x-auto rounded-lg border border-border bg-[#0B0E14] p-4"
    />
  );
});
MermaidDiagram.displayName = 'MermaidDiagram';

const PlotlyChart = React.memo(({ code }: { code: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadAndRender = async () => {
      try {
        let chartData;
        try {
          chartData = JSON.parse(code);
        } catch (e) {
          throw new Error('Invalid JSON in Plotly code block');
        }

        let Plotly = (window as any).Plotly;
        if (!Plotly) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.plot.ly/plotly-2.32.0.min.js';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Plotly.js from CDN'));
            document.head.appendChild(script);
          });
          Plotly = (window as any).Plotly;
        }

        if (cancelled || !ref.current || !Plotly) return;

        const layout = {
          paper_bgcolor: '#0B0E14',
          plot_bgcolor: '#0B0E14',
          font: {
            color: '#F0F4FA',
            family: 'Inter, system-ui, sans-serif',
            size: 11
          },
          margin: { t: 40, r: 20, l: 40, b: 40 },
          autosize: true,
          showlegend: true,
          ...chartData.layout
        };

        const config = {
          responsive: true,
          displayModeBar: false
        };

        Plotly.newPlot(ref.current, chartData.data || [], layout, config);
        setError(null);
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to render Plotly chart');
        }
      }
    };

    loadAndRender();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <pre className="my-4 overflow-x-auto rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400">
        [Chart Error] {error}
      </pre>
    );
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border bg-[#0B0E14] p-2">
      <div ref={ref} className="w-full min-h-[300px]" />
    </div>
  );
});
PlotlyChart.displayName = 'PlotlyChart';



const preserveSingleNewlines = (text: string): string => {
  if (!text) return '';
  const lines = text.split('\n');
  let inCodeBlock = false;
  let inTable = false;
  let inMathBlock = false;

  const processedLines = lines.map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (trimmed.startsWith('$$')) {
      inMathBlock = !inMathBlock;
      return line;
    }
    if (trimmed.startsWith('|')) {
      inTable = true;
      return line;
    } else if (inTable && trimmed === '') {
      inTable = false;
      return line;
    }
    if (inCodeBlock || inTable || inMathBlock) {
      return line;
    }
    if (trimmed === '' || line.endsWith('  ') || line.endsWith('\\')) {
      return line;
    }
    const nextLine = lines[idx + 1];
    if (nextLine !== undefined) {
      const nextTrimmed = nextLine.trim();
      if (
        nextTrimmed !== '' &&
        !nextTrimmed.startsWith('```') &&
        !nextTrimmed.startsWith('$$') &&
        !nextTrimmed.startsWith('|') &&
        !nextTrimmed.startsWith('-') &&
        !nextTrimmed.startsWith('*') &&
        !nextTrimmed.startsWith('#') &&
        !/^\d+\./.test(nextTrimmed)
      ) {
        return line + '  ';
      }
    }
    return line;
  });
  return processedLines.join('\n');
};

export const MarkdownRenderer = React.memo(({ content, className = '', pClassName }: MarkdownRendererProps) => {
  const processedContent = React.useMemo(() => {
    return preserveSingleNewlines(content);
  }, [content]);
  return (
    <div className={`markdown-content select-text font-sans ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-sm font-black my-2.5 text-saffron border-b border-border pb-1 uppercase tracking-wider" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xs font-black my-2 text-saffron uppercase tracking-wide" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xs font-bold my-1.5 text-text" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className={pClassName !== undefined ? pClassName : "mb-2 last:mb-0 leading-relaxed text-xs sm:text-sm"} {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-5 mb-2.5 flex flex-col gap-1 text-xs sm:text-sm" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-5 mb-2.5 flex flex-col gap-1 text-xs sm:text-sm" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="mb-0.5" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-border bg-[#0B0E14] max-w-full">
              <table className="min-w-full divide-y divide-border border-collapse text-left" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-[#121620]" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-border" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-bg-s3/40 transition-colors" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-wider text-text-muted border-r last:border-r-0 border-border" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-3 py-2 text-xs text-text border-r last:border-r-0 border-border" {...props} />
          ),
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="max-h-[400px] w-full object-contain rounded-lg border border-border my-4" />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match?.[1];

            // ── Mermaid block: render as 2D diagram ──
            if (lang === 'mermaid') {
              return null;
            }

            // ── Plotly block: render as Chart ──
            if (lang === 'plotly') {
              return <PlotlyChart code={String(children).trim()} />;
            }

            const inline = !match;
            return inline ? (
              <code className="bg-[#0B0E14] text-saffron px-1 py-0.5 rounded font-mono text-[11px]" {...props}>
                {children}
              </code>
            ) : (
              <pre className="bg-[#0B0E14] p-3 rounded-lg overflow-x-auto font-mono text-[11px] border border-border my-2 text-left">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-saffron" {...props} />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
});
MarkdownRenderer.displayName = 'MarkdownRenderer';
