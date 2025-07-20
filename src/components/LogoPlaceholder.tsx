
import React from 'react';

const LogoPlaceholder = () => (
  <svg 
    className="w-logo-width h-logo-height flex-shrink-0 max-w-full max-h-full"
    viewBox="0 0 180 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <rect 
      width="180" 
      height="60" 
      rx="12" 
      fill="hsl(var(--muted))" 
      stroke="hsl(var(--border))" 
      strokeWidth="3"
    />
    <circle cx="36" cy="30" r="9" fill="hsl(var(--primary))" />
    <rect x="60" y="21" width="105" height="6" rx="3" fill="hsl(var(--primary))" />
    <rect x="60" y="33" width="75" height="6" rx="3" fill="hsl(var(--muted-foreground))" />
  </svg>
);

export default LogoPlaceholder;
