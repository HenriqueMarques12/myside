'use client';

import * as React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ $variant?: string; $size?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.875rem;
  
  /* Variants */
  ${props => {
    switch (props.$variant) {
      case 'outline':
        return `
          background: transparent;
          border: 1px solid ${props.theme.border};
          color: ${props.theme.textPrimary};
          
          &:hover:not(:disabled) {
            background: ${props.theme.muted};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          border: none;
          color: ${props.theme.textPrimary};
          
          &:hover:not(:disabled) {
            background: ${props.theme.muted};
          }
        `;
      case 'destructive':
        return `
          background: #ef4444;
          border: none;
          color: white;
          
          &:hover:not(:disabled) {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: ${props.theme.primary};
          border: none;
          color: white;
          
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
    }
  }}

  /* Sizes */
  ${props => {
    switch (props.$size) {
      case 'sm':
        return 'padding: 0.375rem 0.75rem;';
      case 'lg':
        return 'padding: 0.75rem 1.5rem; font-size: 1rem;';
      case 'icon':
        return `
          padding: 0.5rem;
          width: 2.5rem;
          height: 2.5rem;
        `;
      default:
        return 'padding: 0.5rem 1rem;';
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <StyledButton
        className={className}
        $variant={variant}
        $size={size}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };