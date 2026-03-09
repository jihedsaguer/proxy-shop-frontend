import React from 'react';
import cn from 'clsx';

export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div
    className={cn(
      'rounded-lg border border-gray-200 bg-white shadow-sm',
      className,
    )}
  >
    {children}
  </div>
);

export default Card;
