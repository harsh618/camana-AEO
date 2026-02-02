import React from 'react';

export default function Logo({ theme = 'dark', className = "" }) {
  const logoSrc = theme === 'light' 
    ? '/logos/searchlyst-light.svg' 
    : '/logos/searchlyst-dark.svg';
  
  return (
    <img 
      src={logoSrc} 
      alt="Searchlyst" 
      className={`${className} object-contain`}
    />
  );
}
