"use client"

import React, { useRef, useEffect, forwardRef } from 'react';

type ShinyButtonProps = {
  as?: React.ElementType; 
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const ShinyButton = forwardRef<HTMLElement, ShinyButtonProps>(
  ({ as: Component = 'button', children, ...props }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLElement>;

    useEffect(() => {
      const element = resolvedRef.current;
      if (!element) return;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
      };

      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }, [resolvedRef]);

    return (
      <Component ref={resolvedRef as any} {...props}>
        {children}
      </Component>
    );
  }
);

ShinyButton.displayName = 'ShinyButton';