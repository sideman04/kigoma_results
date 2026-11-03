import * as React from 'react';
import { cn } from '../utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <hr
      className={cn(
        'separator border-neutral-200',
        orientation === 'horizontal' ? 'h-[1px] w-full my-0' : 'w-[1px] h-full mx-0',
        className
      )}
      aria-hidden={decorative ? undefined : 'false'}
      {...props}
    />
  );
}
