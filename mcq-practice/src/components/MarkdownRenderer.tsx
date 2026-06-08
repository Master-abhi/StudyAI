import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// ─── Mermaid diagram block ─────────────────────────────────────────────────
let mermaidInitialized = false;

const MermaidDiagram: React.FC<{ code: string }> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    let cancelled = false;

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
        const { svg } = await mermaid.render(id.current, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<pre style="color:#f87171;font-size:11px;padding:8px">[Diagram Error] ${String(err)}</pre>`;
        }
      }
    };

    render();
    return () => { cancelled = true; };
  }, [code]);

  return (
    <div
      ref={ref}
      className="my-4 flex justify-center overflow-x-auto rounded-lg border border-border bg-[#0B0E14] p-4"
    />
  );
};

// ─── Main MarkdownRenderer ─────────────────────────────────────────────────
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content select-text font-sans ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
            <p className="mb-2 last:mb-0 leading-relaxed text-xs sm:text-sm" {...props} />
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
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match?.[1];

            // ── Mermaid block: render as 2D diagram ──
            if (lang === 'mermaid') {
              return <MermaidDiagram code={String(children).trim()} />;
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
        {content}
      </ReactMarkdown>
    </div>
  );
};
