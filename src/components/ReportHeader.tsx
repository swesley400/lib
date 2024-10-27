import React, { forwardRef } from 'react';
import { Report } from 'interface/report.interface';

export const ReportHeader = forwardRef(({ report }: { report: Report }, ref) => {
  return (
    <header className="header" ref={ref as any}>
      <div dangerouslySetInnerHTML={{ __html: report.header.html }} />
    </header>
  );
});
export function getHeaderHeight(): number {
  const header = document.querySelector(".header");
  return header ? Math.min(header.getBoundingClientRect().height, 113.39) : 113.39; // 4 cm em pontos
}

