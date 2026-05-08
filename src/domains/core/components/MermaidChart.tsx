import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'Readex Pro, sans-serif',
    primaryColor: '#eef2ff',
    primaryTextColor: '#312e81',
    primaryBorderColor: '#6366f1',
    lineColor: '#94a3b8',
    secondaryColor: '#f8fafc',
    tertiaryColor: '#fff',
  }
});

interface MermaidChartProps {
  chart: string;
}

export function MermaidChart({ chart }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render('mermaid-svg-' + Math.random().toString(36).substring(2, 9), chart).then((result) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = result.svg;
        }
      }).catch(err => console.error("Mermaid error:", err));
    }
  }, [chart]);

  return <div ref={containerRef} className="flex justify-center w-full" style={{ direction: 'ltr' }} />;
}
