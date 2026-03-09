import React from 'react';
import cn from 'clsx';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-800',
};

const Badge: React.FC<BadgeProps> = ({ variant = 'default', className, children }) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variantStyles[variant],
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
