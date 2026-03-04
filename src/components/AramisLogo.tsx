import React from 'react';

interface AramisLogoProps {
  className?: string;
  color?: string;
}

export const AramisLogo: React.FC<AramisLogoProps> = ({ className, color = "currentColor" }) => {
  return (
    <svg 
      viewBox="0 0 180 40" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ height: '24px', width: 'auto', display: 'block' }}
    >
      <text 
        x="5" 
        y="30" 
        fontFamily="Montserrat, sans-serif" 
        fontSize="30" 
        fontWeight="400" 
        fill={color} 
        letterSpacing="8"
      >
        ARAMIS
      </text>
      <line x1="2" y1="17" x2="32" y2="17" stroke="#E5182D" strokeWidth="2.5" />
    </svg>
  );
};
