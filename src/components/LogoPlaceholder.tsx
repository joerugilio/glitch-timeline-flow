
import React from 'react';

const LogoPlaceholder = () => (
  <svg 
    width="180" 
    height="60" 
    viewBox="0 0 180 60" 
    className="flex-shrink-0"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
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
