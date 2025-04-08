// src/components/ui/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="border-b p-4">
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <div className="p-4">{children}</div>;
}

// Exportação agregada (opcional)
export default {
  Card,
  Header: CardHeader,
  Content: CardContent,
};