import React from 'react';
import cn from 'clsx';

export interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className, children }) => (
  <div className={cn('overflow-hidden rounded-lg border border-gray-200', className)}>
    <table className="min-w-full divide-y divide-gray-200 bg-white">{children}</table>
  </div>
);

export const TableHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <thead className="bg-gray-50">
    <tr className={cn('text-left text-xs font-medium text-gray-500 uppercase tracking-wider', className)}>
      {children}
    </tr>
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
);

export const TableRow: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <tr className={cn('bg-white', className)}>{children}</tr>
);

export const TableCell: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <td className={cn('whitespace-nowrap px-4 py-3 text-sm text-gray-700', className)}>{children}</td>
);
