import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Download, ZoomIn } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
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

const MermaidDiagram: React.FC<{ code: string }> = ({ code }) => {
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
};

// ─── Plotly chart block ──────────────────────────────────────────────────
const PlotlyChart: React.FC<{ code: string }> = ({ code }) => {
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
};

// ─── Image card block ────────────────────────────────────────────────────
const getProxyUrl = (url: string): string => {
  if (url && url.startsWith('https://image.pollinations.ai/prompt/')) {
    const parts = url.split('/prompt/');
    if (parts[1]) {
      const promptPart = parts[1].split('?')[0];
      const params = new URLSearchParams(parts[1].split('?')[1] || '');
      const seed = params.get('seed') || '';
      
      const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
      return `${host}/api/generate-image?prompt=${promptPart}&seed=${seed}`;
    }
  }
  return url;
};

const ImageCard: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(() => src ? getProxyUrl(src) : undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src) {
      setCurrentSrc(getProxyUrl(src));
    } else {
      setCurrentSrc(undefined);
    }
    setLoading(true);
    setError(false);
  }, [src]);

  if (!currentSrc) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(currentSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = alt ? `${alt.replace(/\s+/g, '_')}.png` : 'ai_generated_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download image', err);
      window.open(currentSrc, '_blank');
    }
  };

  const handleImgError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className="group my-4 overflow-hidden rounded-lg border border-border bg-[#0B0E14] text-left relative">
      <div className="relative flex min-h-[200px] items-center justify-center bg-[#07090e]">
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07090e] gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-saffron border-t-transparent" />
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider animate-pulse">
              Generating Image...
            </span>
          </div>
        )}
        {error ? (
          <div className="p-6 text-xs text-redL font-bold flex flex-col items-center gap-3">
            <span>Failed to Generate Image</span>
            <a
              href={currentSrc}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded bg-saffron hover:bg-orange-500 text-bg-s1 font-black uppercase text-[10px] tracking-wider transition-all cursor-pointer shadow-md"
            >
              Retry Direct Link
            </a>
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={alt}
            className={`max-h-[400px] w-full object-contain transition-all duration-300 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            onLoad={() => setLoading(false)}
            onError={handleImgError}
          />
        )}
        
        {!loading && !error && (
          <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 rounded-md backdrop-blur-sm">
            <button
              onClick={handleDownload}
              className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
              title="Download image"
            >
              <Download className="w-4 h-4" />
            </button>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded hover:bg-white/10 text-white cursor-pointer"
              title="View full size"
            >
              <ZoomIn className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
      {alt && !loading && (
        <div className="border-t border-border/40 bg-[#0B0E14] px-3.5 py-2">
          <p className="text-[11px] font-bold text-text-muted italic">{alt}</p>
        </div>
      )}
    </div>
  );
};

// ─── Main MarkdownRenderer ─────────────────────────────────────────────────
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
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
          img: ({ src, alt }) => (
            <ImageCard src={src} alt={alt} />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match?.[1];

            // ── Mermaid block: render as 2D diagram ──
            if (lang === 'mermaid') {
              return <MermaidDiagram code={String(children).trim()} />;
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
        {content}
      </ReactMarkdown>
    </div>
  );
};
