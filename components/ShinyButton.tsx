// components/ShinyButton.tsx
"use client"

import React, { useRef, useEffect, forwardRef } from 'react';

// Adicionamos a prop "as" para permitir polimorfismo
type ShinyButtonProps = {
  as?: React.ElementType; // Pode ser 'button', 'a', etc.
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>; // Aceita props de qualquer elemento HTML

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