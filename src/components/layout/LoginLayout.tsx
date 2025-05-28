import React from 'react';
import { cn } from '@/lib/utils';

interface LoginLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * LoginLayout provides the outer structure for authentication pages like the login page.
 * It implements the primary flex-based centering for content within the viewport,
 * applying the project-defined background color and responsive width constraints.
 * This component is designed to wrap content such as a login form.
 */
const LoginLayout: React.FC<LoginLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        // Implements "Layout Requirements -> overall -> definition"
        // Centers content vertically and horizontally, full screen height, background color.
        'flex justify-center items-center h-screen bg-background',
        className // Allows for additional custom styling on the main element
      )}
    >
      {/* Implements "Layout Requirements -> overall -> sizing -> container" */}
      {/* Constrains the width of the content and provides padding. */}
      <div className="max-w-md w-full px-6 py-8">
        {children}
      </div>
    </main>
  );
};

export default LoginLayout;
